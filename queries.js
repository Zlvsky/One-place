var mysql = require('mysql');
var connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
  timezone: 'utc'
});

function getAllDataFromTarget(target) {
  const queryString = `SELECT * from ${target}`;
  return new Promise((resolve, reject) => {
    connection.query(queryString, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        resolve(result);
      }
    })
  })
}


function getAllClientsWithOrdersCount() {
  const queryString = "SELECT * from clients as clients; select c.client_id, count(o.id) as ordersCount from clients c join orders o where c.client_id = o.client_id group by client_id";
  return new Promise((resolve, reject) => {
    connection.query(queryString, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        resolve(result);
      }
    })
  })
}

function getOrdersById(orderId) {
  const queryString = "SELECT * from orders where id = ?";
  return new Promise((resolve, reject) => {
    connection.query(queryString, [orderId], function(error, results) {
      if(error) {
        console.log(error);
      } else {
        resolve(results[0]);
      }
    })
  })
}

function getClientById(clientId) {
  const queryString = "SELECT * from clients where client_id = ?";
  return new Promise((resolve, reject) => {
    connection.query(queryString, [clientId], function (error, clientByIdResults) {
      if(error) {
        console.log(error);
      } else {
        resolve(clientByIdResults[0])
      }
    })
  })
}
function getProductById(productId) {
  const queryString = "SELECT * from products where id = ?";
  return new Promise((resolve, reject) => {
    connection.query(queryString, [productId], function (error, productById) {
      if(error) {
        console.log(error);
      } else {
        resolve(productById[0])
      }
    })
  })
}

function getOrdersByClientId(clientId) {
  const queryString = "SELECT * from orders where client_id = ?";
  return new Promise((resolve, reject) => {
    connection.query(queryString, [clientId], function (error, ordersByClientIdResults) {
      if(error) {
        console.log(error);
      } else {
        resolve(ordersByClientIdResults)
      }
    })
  })
}

function getProductsBySingleOrderId(orderId) {
  const queryString = "SELECT * from products where order_id = ?";
  return new Promise((resolve, reject) => {
    connection.query(queryString, [orderId], function(error, productsBySingleOrderIdResults) {
      if(error) {
        console.log(error);
      } else {
        resolve(productsBySingleOrderIdResults);
      }
    })
  })
}

function getProductsByMultipleOrderId(orders) {
  const queryString = "SELECT * from products where order_id = ?";
  var productsByIdResults = orders.map((order, index) => {
    return new Promise((resolve, reject) => {
      connection.query(queryString, [order.id], function(error, productsByOrderIdResults) {
        if(error) {
          console.log(error);
        } else {
          resolve(productsByOrderIdResults);
        }
      })
    })
  });
  return Promise.all(productsByIdResults);
}

function updateClientById(clientData, client_id) {
  const queryString = "UPDATE clients SET client = ?, clientDetails = ?, phone = ?, country = ?, street = ?, city = ?, postalCode = ? where client_id = ?";
  const passedValues = [clientData.client, clientData.clientDetails, clientData.phone, clientData.country, clientData.street, clientData.city, clientData.postalCode, client_id];
  return new Promise((resolve, reject) => {
    connection.query(queryString, passedValues, function(error) {
      if(error) {
        console.log(error);
      }
      resolve("success");
    })
  })
}

function updateOrderById(totalCost, orderStatus, orderId) {
  const queryString = "UPDATE orders SET price = ?, status = ? where id = ?";
  return new Promise((resolve, reject) => {
    connection.query(queryString, [totalCost, orderStatus, orderId], function(error) {
      if(error) {
        console.log(error);
      }
      resolve("success");
    })
  })
}

function addMultipleProducts(orderId, productsArray) {
  const queryString = "INSERT into products VALUES('', ?, ?, ?, ?, ?)";
  const queryStringForCheck = "SELECT * from products where id = ?";
  return new Promise((resolve, reject) => {
    productsArray.forEach((product) => {
      // check if product with same id is in database if it is, skip adding it
      connection.query(queryStringForCheck, [product.id], function(productExistError, productExistResult) {
        if(productExistError) {
          console.log(productExistError);
        }
        // if item is not in database, add it
        if (!productExistResult.length) {
          const passedValues = [orderId, product.productName, product.amount, product.itemPrice, (product.amount * product.itemPrice)];
          connection.query(queryString, passedValues, function(error) {
            if (error) {
              console.log(error);
            }
          })
        }
      })
    });
    resolve("success");
  })
}

function deleteProductsById(deletedIds) {
  const queryString = "DELETE from products WHERE id IN (?)";
  const sortedDeletedIds = deletedIds.sort((a, b) => a - b);
  return new Promise((resolve, reject) => {
    connection.query(queryString, [sortedDeletedIds], function(error) {
      if(error) {
        console.log(error);
      }
      resolve("success");
    })
  })
}

function addNewClient(clientDetails) {
  const queryString = "INSERT into clients VALUES ('', ?, ?, ?, ?, ?, ?, ?, ?)";
  const currentDate = new Date();
  const passedValues = [clientDetails.clientName, clientDetails.clientDetails, clientDetails.phone, clientDetails.country, clientDetails.street, clientDetails.city, clientDetails.postalCode, currentDate]
  return new Promise((resolve, reject) => {
    connection.query(queryString, passedValues, function(error) {
      if(error) {
        console.log(error);
      }
      resolve("success");
    })
  })
}

function getDasboardData() {
  const queryString = `
  SELECT * from clients as clients;
  SELECT * from orders as orders;
  SELECT * from calendar where deadlineDate >= curdate() and DATEDIFF(deadlineDate, CURDATE()) <= 5 order by deadlineDate asc limit 2
  `;
  return new Promise((resolve, reject) => {
    connection.query(queryString, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        resolve(result);
      }
    })
  })
}

function addNewEvent(eventData) {
  const queryString = "INSERT into calendar values ('', ?, ?, ?, ?, ?, ?)";
  const passedValues = [eventData.title, eventData.details, eventData.deadlineDate, eventData.hours, eventData.addDate, eventData.worker];
  return new Promise((resolve, reject) => {
    connection.query(queryString, passedValues, function(error) {
      if(error) {
        console.log(error);
      } else {
        resolve("success");
      }
    })
  })
}

function deleteUserById(userId) {
  const queryString = "DELETE from accounts WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(queryString, [userId], function(error) {
      if(error) {
        console.log(error);
      } else {
        resolve("success")
      }
    })
  })
}

function getUsersForAdminPanel() {
  const queryString = "SELECT id, username, role, dateCreated from accounts";
  return new Promise((resolve, reject) => {
    connection.query(queryString, function(error, result) {
      if(error) {
        console.log(error);
      } else {
        resolve(result);
      }
    })
  })
}

function createNewUser(userDetails, hashedPassword) {
  const queryString = "INSERT into accounts VALUES ('', ?, ?, ?, ?)";
  const currentDate = new Date();
  const passedValues = [userDetails.username, hashedPassword, userDetails.role, currentDate];
  return new Promise((resolve, reject) => {
    connection.query(queryString, passedValues, function(error) {
      if(error) {
        console.log(error);
      } else {
        resolve("success");
      }
    })
  })
}

module.exports = {
  getAllDataFromTarget,
  getOrdersById,
  getClientById,
  getOrdersByClientId,
  getProductsBySingleOrderId,
  getProductsByMultipleOrderId,
  deleteProductsById,
  addMultipleProducts,
  updateOrderById,
  updateClientById,
  getAllClientsWithOrdersCount,
  addNewClient,
  getDasboardData,
  addNewEvent,
  deleteUserById,
  getUsersForAdminPanel,
  createNewUser
};
