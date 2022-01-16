import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Styles/order.css';
import { AuthLoginInfo }  from './../AuthComponents/AuthLogin';
import Popup from '../Components/Popup';
import Pagination from '../Components/Pagination';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';


function Orders() {
  const [newOrderSubmitted, setNewOrderSubmitted] = useState(false);

  const [ordersData, setOrdersData] = useState([]);

  const [buttonPopup, setButtonPopup] = useState(false);

  const [filterOrders, setFilterOrders] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filterActive, setFilterActive] = useState(1);

  const [isNewClient, setIsNewClient] = useState(true);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [oldClientId, setOldClientId] = useState(null);
  const [stringSearch, setStringSearch] = useState('');
  const [allClientsData, setAllClientsData] = useState([]);


  const ctx = useContext(AuthLoginInfo)

  const [clientDetails, setClientDetails] = useState({
    nazwaKlienta: "",
    szczegolyKlienta: "",
    telefon: "",
    kraj: "Polska",
    ulica: "",
    miasto: "",
    kodpocztowy: "",
    status: "",
    produkty: [

    ],
    nazwaPracownika: ctx.username
  });
  const [productDetails, setProductDetails] = useState({
    nazwaProduktu: "",
    ilosc: 1,
    cenaSzt: 0,
    cenaCalkowita: 0
  })


  useEffect(() => {
    setNewOrderSubmitted(false)
    axios.get("http://localhost:5000/orders", {
      withCredentials: true
    }).then(res => {
      if (res.data != null) {
        setOrdersData(res.data)
      }
    });
  }, [newOrderSubmitted]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersFiltered = ordersData?.filter((val) => {
    if((val.status).includes(filterOrders) && (val.id + '').includes(filterId)) {
      return val
    }
  }).reverse()
  const itemsPerPage = 30;
  const totalOrders = ordersFiltered.length;
  const computedOrders = ordersFiltered.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
  const computedOrdersLength = computedOrders.length;

  const removeProduct = (e) => {
    let array = clientDetails.produkty;
    console.log(array)
    let index = clientDetails.produkty.e;
    if (index !== -1) {
      array.splice(index, 1);
      setClientDetails({...clientDetails, produkty: array })
    }
  }

  const addNewOrder = () => {
    axios.post("http://localhost:5000/neworder", {
      clientDetails,
      isNewClient,
      oldClientId
    }, {
      withCredentials: true
    }).then(res => {
      if(res.data === "success") {
        setClientDetails({
          nazwaKlienta: "",
          szczegolyKlienta: "",
          telefon: "",
          kraj: "Polska",
          ulica: "",
          miasto: "",
          kodpocztowy: "",
          status: "",
          produkty: [],
          nazwaPracownika: ctx.username
        })
        setProductDetails({
          nazwaProduktu: "",
          ilosc: 1,
          cenaSzt: 0,
          cenaCalkowita: 0
        })
        setNewOrderSubmitted(true);
      }
    })
  }

  const getAllClientsFromDatabase = () => {
    axios.get("http://localhost:5000/clients", {
      withCredentials: true
    }).then(res => {
      setAllClientsData(res.data[0])
    })
  }

  const setSearchingInput = (id, klient, szczegoly, telefon, kraj, ulica, miasto, kodpocztowy) => {
    setOldClientId(id);
    setClientDetails({...clientDetails, nazwaKlienta: klient, szczegolyKlienta: szczegoly, telefon: telefon, kraj: kraj, ulica: ulica, miasto: miasto, kodpocztowy: kodpocztowy})
    setDisplaySearch(false);
    setStringSearch('');
  }

  return (
    <div className="bodyWrap">
      <div className="contentOrderWrap">
        <div className="leftSide">
          <h1>Zamówienia</h1>
            <Pagination
              total={totalOrders}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)}
              />
            <div className="orderNavWrap">
              <div className="orderNav">
                <ul>
                  <li className={`${filterActive === 1 ? 'active': ''}`} onClick={() => {setFilterOrders(""); setFilterActive(1); }}>Wszystkie zamówienia</li>
                  <li className={`${filterActive === 2 ? 'active': ''}`} onClick={() => {setFilterOrders("Otwarte"); setFilterActive(2); }}>Otwarte</li>
                  <li className={`${filterActive === 3 ? 'active': ''}`} onClick={() => {setFilterOrders("Zamknięte"); setFilterActive(3); }}>Zamknięte</li>
                  <li className={`${filterActive === 4 ? 'active': ''}`} onClick={() => {setFilterOrders("Wysłane"); setFilterActive(4); }}>Wysłane</li>
                </ul>
                </div>
              <div className="addOrderWrap">
                <input type="text" placeholder="Szukaj po ID" onChange={e => setFilterId(e.target.value)} value={filterId} />
                <button
                  className="addOrder"
                  onClick={() => {
                    setButtonPopup(true)
                    setIsNewClient(true)
                    getAllClientsFromDatabase();
                  }}
                  >
                <AddCircleOutlineRoundedIcon />
                <span className="addOrderText">Dodaj</span>
                </button>
              </div>
            </div>
            <div className="orderWrap">
              <table>
                <thead>
                  <tr>
                    <th>Numer zamówienia</th>
                    <th>Nazwa klienta</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Cena</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {computedOrders?.map(order => {
                    return (
                    <tr key={order.id}>
                      <td><font className="maincolor">#</font>{order.id}</td>
                      <td>{order.klient}</td>
                      <td>{(order.data).split('T')[0]}</td>
                      <td className={order.status}>{order.status}</td>
                      <td>{order.cena} zł</td>
                      <td className="maincolor">
                        <Link to={`/zamowienia/${order.id}`}>
                        <ReadMoreRoundedIcon />
                        </Link>
                      </td>
                    </tr>
                  )
                  })}
                </tbody>
              </table>
            </div>
        </div>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="popupWrap">
          <div className="productSummary">
            <h3 className="productSummaryLeft">Dodaj nowe zamówienie</h3>
            <div className="productSummaryRight newUserSwitch">
                <h3>Nowy klient?</h3>
                <input type="radio" name="rdo" id="yes" onChange={() => setIsNewClient(true)} defaultChecked />
                <input type="radio" name="rdo" id="no" onChange={() => setIsNewClient(false)} />
                <div className="switch">
                  <label className="switchLabel" htmlFor="yes">Tak</label>
                  <label className="switchLabel" htmlFor="no">Nie</label>
                  <span></span>
              </div>
            </div>
            </div>
          <div className="addNewOrderWrap">

            {!isNewClient && (
              <div className="autoCompleteWrap">
                <input
                  id="autoCompleteInput"
                  placeholder="Wyszukaj klienta..."
                  type="text"
                  autoComplete="off"
                  value={stringSearch}
                  onChange={(e) => {
                    setStringSearch(e.target.value)
                    if ((e.target.value).length > 0) {
                      setDisplaySearch(true)
                    } else {
                      setDisplaySearch(false)
                    }
                  }}
                  />
                {displaySearch && (
                  <div className="autoCompleteContainer">
                    {allClientsData?.filter((v) => {
                      if([v.id_klienta + '', v.klient.toLowerCase()].some(r => r.includes(stringSearch))) {
                        return v;
                      }
                    }).map((val, i) => {
                      return (
                        <div
                          onClick={() => setSearchingInput(val.id_klienta, val.klient, val.szczegolyKlienta, val.telefon, val.kraj, val.ulica, val.miasto, val.kodpocztowy)}
                          className="autoCompleteOption"
                          key={i}
                          >
                          <span>{val.id_klienta}</span>
                          <span>{val.klient}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="addNewOrderForm">
              <div className="orderDetails">
                <div className="input-group">
                  <input type="text" placeholder="Nazwa klienta" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.nazwaKlienta} onChange={e => setClientDetails({...clientDetails, nazwaKlienta: e.target.value})} disabled={!isNewClient} required/>
                  <input type="text" placeholder="Numer telefonu" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.telefon} onChange={e => setClientDetails({...clientDetails, telefon: e.target.value})} disabled={!isNewClient} required/>
              </div>
                <div className="input-group">
                  <input type="textarea" placeholder="Szczegóły zamówienia" className="orderDetailsInput" value={clientDetails.szczegolyKlienta} onChange={e => setClientDetails({...clientDetails, szczegolyKlienta: e.target.value})} disabled={!isNewClient} required/>
                </div>
                <div className="input-group">
                  <input type="text" placeholder="Kraj" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.kraj} onChange={e => setClientDetails({...clientDetails, kraj: e.target.value})} disabled={!isNewClient} required/>
                  <input type="text" placeholder="Nazwa ulicy, numer budynku / lokalu" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.ulica} onChange={e => setClientDetails({...clientDetails, ulica: e.target.value})} disabled={!isNewClient} required/>
                </div>
                <div className="input-group">
                  <input type="text" placeholder="Miasto" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.miasto} onChange={e => setClientDetails({...clientDetails, miasto: e.target.value})} disabled={!isNewClient} required/>
                  <input type="text" placeholder="Kod pocztowy" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.kodpocztowy} onChange={e => setClientDetails({...clientDetails, kodpocztowy: e.target.value})} disabled={!isNewClient} required/>
                </div>
                <div className="input-group">
                  <select className="orderDetailsSelect" placeholder="Wybierz status" value={clientDetails.status} onChange={e => setClientDetails({...clientDetails, status: e.target.value})} required>
                    <option>Otwarte</option>
                    <option>Zamknięte</option>
                    <option>Wysłane</option>
                  </select>
                </div>
              </div>

              <div className="productDetails">
                <div className="newOrderTable">
                <table>
                  <thead>
                    <tr>
                      <th>Nazwa produktu</th>
                      <th>Ilość</th>
                      <th>Cena za sztukę</th>
                      <th>Cena całkowita</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" placeholder="Nazwa produktu" className="productDetailsInput" value={productDetails.nazwaProduktu} onChange={e => setProductDetails({...productDetails, nazwaProduktu: e.target.value})} required/>
                      </td>
                      <td>
                        <input type="number" placeholder="1" className="productDetailsInput" value={productDetails.ilosc} onChange={e => setProductDetails({...productDetails, ilosc: Number(e.target.value)})} required/>
                      </td>
                      <td>
                        <input type="number" placeholder="10.00" className="productDetailsInput" value={productDetails.cenaSzt} onChange={e => setProductDetails({...productDetails, cenaSzt: Number(e.target.value)})} required/>
                      </td>
                      <td>
                        {(productDetails.cenaSzt) * (productDetails.ilosc)}
                      </td>
                      <td></td>
                    </tr>
                    {(clientDetails.produkty).map((produkt, key) => {
                      return (
                        <tr key={key}>
                          <td>{produkt.nazwaProduktu}</td>
                          <td>{produkt.ilosc}</td>
                          <td>{produkt.cenaSzt}</td>
                          <td>{
                              produkt.ilosc * produkt.cenaSzt
                            }</td>
                          <td className="removeProduct" onClick={() => removeProduct(key)}><RemoveRoundedIcon /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
        </div>

        <div className="submitWrap">

          <div className="productSummary">
            <div className="productSummaryLeft">
              <span className="addNewLine" onClick={() => {setClientDetails({...clientDetails, produkty: [...clientDetails.produkty, productDetails] })}}>+ Dodaj kolejny produkt</span>
            </div>
            <div className="productSummaryRight">
              <span className="totalCost">Całkowita cena produktów - {clientDetails.produkty.reduce((a,b) => a + (b.cenaSzt * b.ilosc || 0), 0)} zł</span>
            </div>
          </div>
          <div className="submitNewOrder">
            <button className="submitNewOrderBtn" onClick={() => addNewOrder()}>
              <AddCircleOutlineRoundedIcon />
              <span className="addOrderText">Dodaj</span>
            </button>
          </div>
        </div>
        </div>
      </Popup>
    </div>
  )
}

export default Orders;
