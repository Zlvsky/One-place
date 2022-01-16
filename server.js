if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
const flash = require('express-flash');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var bcrypt = require('bcrypt');
const passport = require("passport");
const cors = require("cors");

var connection = mysql.createPool({
  host  :   'localhost',
  user  :   'root',
  password: '',
  database: 'nodelogin',
  multipleStatements: true,
  timezone: 'utc'
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200
};



const initializePassport = require('./passport-config');
initializePassport(connection, passport);


app.use(cors(corsOptions));
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/login', passport.authenticate('local'), (req,res) => {
  res.send("success")
});

app.get('/logout', (req,res) => {
  req.logout();
  res.send("success");
});

app.get('/user', (req,res) => {
  res.send(req.user)
});

app.get('/orders', (req,res) => {
  connection.query(`SELECT * from zamowienia`, async function(error, results) {
    if(results.length > 0) {
      connection.query('SELECT * from klienci', async function(error2, results2) {
        if(results2.length > 0) {
          const a3 = results.map(t1 => ({...t1, ...results2.find(t2 => t2.id_klienta === t1.id_klienta)}))
          res.send(JSON.stringify(a3))
        } else {
          return null;
        }
      })
    } else {
      return null;
    }
  })
});

app.get("/order_by_id", (req,res) => {
  let type = req.query.type;
  let orderId = req.query.id;
  connection.query('SELECT * from zamowienia where id = ?', [orderId], async function(error, results) {
    if(results.length > 0) {
      try {
        connection.query('SELECT * from produkty where id_zamowienia = ?', [orderId], async function(error2, results2) {
          if(results2.length > 0) {
            try {
              connection.query('SELECT * from klienci where id_klienta = ?', [results[0].id_klienta], async function(error3, results3) {
                if (results3) {
                  let finalQuery = {zamowienie: results[0], produkty: results2, klient: results3[0]}
                  res.send(finalQuery)
                }
              })

            } catch(error) {
              res.send(null);
            }
          } else {
            return null;
          }
        })
      } catch(error) {
        res.send(null)
      }
    } else {
      return null;
    }
  })
});

app.post("/updateorder", (req,res) => {
  let orderId = req.body.zamowienieId;
  let clientData = req.body.clientDetails.klient;
  let orderData = req.body.clientDetails.zamowienie;
  let productsData = req.body.clientDetails.produkty;
  let deletedIds = req.body.deletedItems.ids;
  let fullCost = productsData.reduce((a,b) => a + (b.cenaSzt * b.ilosc || 0), 0);
  let currentDate = new Date();

  connection.query("UPDATE klienci SET klient = ?, szczegolyKlienta = ?, telefon = ?, kraj = ?, ulica = ?, miasto = ?, kodpocztowy = ? where id_klienta = ?", [clientData.klient, clientData.szczegolyKlienta, clientData.telefon, clientData.kraj, clientData.ulica, clientData.miasto, clientData.kodpocztowy, orderData.id_klienta], function(error, result) {
    if (error) throw error;
    connection.query("UPDATE zamowienia SET cena = ?, status = ? where id = ?", [fullCost, orderData.status, orderId], function(error5, result5) {
      if (error5) throw error5;
    })

    productsData.forEach((e) => {
      connection.query("SELECT * from produkty where id = ?", [e.id], function(error2, result2) {
        if (error2) throw error2;
        if (!result2.length) {
          connection.query("INSERT into produkty VALUES('', ?, ?, ?, ?, ?)", [orderId, e.nazwaProduktu, e.ilosc, e.cenaSzt, (e.ilosc * e.cenaSzt)], function(error3, result3) {
            if (error3) throw error3;
          })
        }
      })
    });

    if(deletedIds !== 0) {
      deletedIds.sort((a, b) => a - b)
      connection.query("DELETE from produkty WHERE id IN (?)", [deletedIds], function(error4, result4) {
        if (error4) throw error4;
      })
    }
    res.send("success");
  })
})

app.post("/neworder", (req,res) => {
  let data = req.body.clientDetails;
  let isNewClient = req.body.isNewClient;
  let oldClientId = req.body.oldClientId;
  let fullCost = data.produkty.reduce((a,b) => a + (b.cenaSzt * b.ilosc || 0), 0);
  let currentDate = new Date();

  if(isNewClient) {
    connection.query("INSERT into klienci VALUES ('', ?, ?, ?, ?, ?, ?, ?)", [data.nazwaKlienta, data.szczegolyKlienta, data.telefon, data.kraj, data.ulica, data.miasto, data.kodpocztowy], function(error, results) {
      let klientId = results.insertId;

      connection.query("INSERT into zamowienia VALUES ('', ?, ?, ?, ?, ?)", [klientId, currentDate, fullCost, data.status, data.nazwaPracownika], function(error2, results2) {
        if(error2) throw error2;
        let zamowienieId = results2.insertId;

        (data.produkty).forEach((e) => {
          connection.query("INSERT into produkty VALUES ('', ?, ?, ?, ?, ?)", [zamowienieId, e.nazwaProduktu, e.ilosc, e.cenaSzt, (e.ilosc * e.cenaSzt)], function(err, result) {
          });
        })
        res.send("success");
      })
    })
  }
  if(!isNewClient) {
    connection.query("INSERT into zamowienia VALUES ('', ?, ?, ?, ?, ?)", [oldClientId, currentDate, fullCost, data.status, data.nazwaPracownika], function(error2, results2) {
      if(error2) throw error2;
      let zamowienieId = results2.insertId;

      (data.produkty).forEach((e) => {
        connection.query("INSERT into produkty VALUES ('', ?, ?, ?, ?, ?)", [zamowienieId, e.nazwaProduktu, e.ilosc, e.cenaSzt, (e.ilosc * e.cenaSzt)], function(err, result) {
        });
      })
      res.send("success");
    })
  }
});

app.get("/clients", (req,res) => {
  connection.query("SELECT * from klienci as klienci; select count(z.id) as iloscZamowien, k.id_klienta from produkty p join zamowienia z join klienci k where p.id_zamowienia = z.id and k.id_klienta = z.id_klienta group by k.id_klienta", function(error, result) {
    if(error) throw error;
    if(result.length > 0) {
      res.send(result)
    }
  })
})

app.post("/newclient", (req,res) => {
  let data = req.body.clientDetails;
  let currentDate = new Date();
  connection.query("INSERT into klienci VALUES ('', ?, ?, ?, ?, ?, ?, ?, ?)", [data.nazwaKlienta, data.szczegolyKlienta, data.telefon, data.kraj, data.ulica, data.miasto, data.kodpocztowy, currentDate], function(error, results) {
    if (error) throw error;
    let klientId = results.insertId;
    res.send("success")
  })
})

app.get("/client_by_id", (req,res) => {
  let clientId = req.query.id;
  connection.query("SELECT * from klienci where id_klienta = ?", [clientId], async function(error, results) {
    if(results.length > 0) {
      try {
        connection.query("SELECT * from zamowienia where id_klienta = ?", [clientId], async function(error2, results2) {
          if(results2.length > 0) {
            try {
              connection.query("SELECT * from produkty where id_zamowienia = ?", [results2[0].id], async function(error3, results3) {
                if(results3.length > 0) {
                  let finalQuery = {klient: results[0], zamowienia: results2, produkty: results3}
                  res.send(finalQuery);
                } else {
                  let finalQuery = {klient: results[0], zamowienia: results2, produkty: null}
                  res.send(finalQuery);
                }
              })
            } catch(error2) {
              res.send(null);
            }
          } else {
            let finalQuery = {klient: results[0], zamowienia: null, produkty: null}
            res.send(finalQuery);
          }
        })
      } catch(error) {
        res.send(null);
      }
    }
  })
});

app.get("/dashboard_data", (req,res) => {
  connection.query("SELECT * from klienci as klienci; SELECT * from zamowienia as zamowienia", function(error, results) {
    if (error) throw error;
    if(results.length > 0) {
      res.send(results)
    }
  })
})

app.post("/newevent", (req,res) => {
  let data = req.body.eventData;
  connection.query("INSERT into kalendarz values ('', ?, ?, ?, ?, ?, ?)", [data.title, data.details, data.deadlineDate, data.hours, data.addDate, data.worker], function(error, results) {
    if(error) throw error;
    res.send("success");
  })
})

app.get("/events", (req,res) => {
  connection.query("SELECT * from kalendarz", function(error, results) {
    if(error) throw error;
    if(results.length > 0) {
      res.send(results)
    }
  })
})

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
