import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Styles/orderPage.css';
import Popup from '../Components/Popup';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

function OrderPage() {
  const { zamowienieId } = useParams();
  const [orderData, setOrderData] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [deletedItems, setDeletedItems] = useState({ids: []});

  const [clientDetails, setClientDetails] = useState({});

  const [productDetails, setProductDetails] = useState({
    nazwaProduktu: "",
    ilosc: 1,
    cenaSzt: 0,
    cenaCalkowita: 0
  })

  useEffect(() => {
    axios.get(`http://localhost:5000/order_by_id?id=${zamowienieId}&type=single`, {
      withCredentials: true
    }).then(res => {
      if(res.data != null) {
        setOrderUpdated(false);
        setOrderData(res.data)
      }
    })
  }, [orderUpdated]);


  const removeProduct = (id) => {
    let array = clientDetails.produkty;
    const newList = array.filter((item) => item.id !== id);

    if (id !== -1) {
      setClientDetails({...clientDetails, produkty: newList});
      setDeletedItems({...deletedItems, ids: [...deletedItems.ids, id]});
    }
  }

  const saveOrderChanges = () => {
    axios.post("http://localhost:5000/updateorder", {
      clientDetails,
      zamowienieId,
      deletedItems
    }, {
      withCredentials: true
    }).then(res => {
      if(res.data === 'success') {
        setOrderUpdated(true);
      }
    })
  }

  return (
    <div className="bodyWrap">
      <div className="orderPageContentWrap">

        <div className="orderPageHeader">
          <h1>Zamówienie <font className="maincolor"> #{zamowienieId}</font></h1>
        </div>

        <div className="orderPageSection">
          <div className="orderPageLeftSide">
            <div className="productsSummary">
              <table>
                <thead>
                  <tr>
                    <th className="summaryHeader">Produkty</th>
                    <th className="alignCenter">Ilość</th>
                    <th className="alignCenter">Cena</th>
                    <th className="alignCenter">Całkowita cena</th>
                  </tr>
                </thead>
                <tbody>
                  { (orderData.produkty)?.map(produkt => {
                    return (
                    <tr key={produkt.id}>
                      <td>{produkt.nazwaProduktu}</td>
                      <td className="alignCenter">x{produkt.ilosc}</td>
                      <td className="alignCenter">{produkt.cenaSzt} zł</td>
                      <td className="alignCenter">{produkt.cenaCalkowita} zł</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>

            <div className="orderDetails">
              <div className="orderDetailsRow">
                <h3 className="summaryHeader">Infomracje o kliencie</h3>
              </div>

              <div className="orderDetailsRow">
                <div className="orderDetailsLeft">
                  Nazwa klienta
                </div>
                <div className="orderDetailsRight">
                  {(orderData.klient)? orderData.klient.klient: ""}
                </div>
              </div>

              <div className="orderDetailsRow">
                <div className="orderDetailsLeft">
                  Numer telefonu
                </div>
                <div className="orderDetailsRight">
                  {(orderData.klient)? orderData.klient.telefon: ""}
                </div>
              </div>

              <div className="orderDetailsRow">
                <div className="orderDetailsLeft">
                  Dodatkowe informacje
                </div>
                <div className="orderDetailsRight">
                  {(orderData.klient)? orderData.klient.szczegolyKlienta: ""}
                </div>
              </div>
            </div>
          </div>

          <div className="orderPageRightSide">
            <div className="userColumn">
              <h3 className="summaryHeader">Dodano przez:</h3>
              <div className="userColumnRow">
                <div className="orderDetailsLeft">
                <p className="userInfo">{(orderData.zamowienie)? orderData.zamowienie.nazwaPracownika: ""}</p>
                </div>
                <div className="orderDetailsRight">
                <button className="editOrderButton" onClick={() => {setButtonPopup(true); setClientDetails(JSON.parse(JSON.stringify(orderData))); setDeletedItems({ids: []})}}>
                  <EditRoundedIcon />
                  Edytuj</button>
              </div>
              </div>
            </div>

            <div className="orderSummary orderDetails">
              <div className="orderDetailsRow">
                <div className="orderDetailsLeft">
                  <h3 className="summaryHeader">Podsumowanie</h3>
                </div>
                <div className="orderDetailsRight">
                  <span className={`orderStatusSummary ${(orderData.zamowienie)? orderData.zamowienie.status: ""}`}>
                    {(orderData.zamowienie)? orderData.zamowienie.status: ""}
                  </span>
                </div>
              </div>

              <div className="orderDetailsRow">
                <div className="orderDetailsLeft">
                  Data
                </div>
                <div className="orderDetailsRight">
                  {(orderData.zamowienie)? (orderData.zamowienie.data).split('T')[0]: ""}
                </div>
              </div>

              <div className="orderDetailsRow">
                <div className="orderDetailsLeft">
                  Cena całkowita
                </div>
                <div className="orderDetailsRight">
                  {(orderData.zamowienie)? (orderData.zamowienie.cena): ""}
                </div>
              </div>
            </div>

            <div className="orderDetails deliveryDetails">
              <h3 className="summaryHeader">Adres dostawy</h3>
              <div className="orderDetailsRow">
                <font className="bold">Kraj:</font> {(orderData.klient)? (orderData.klient.kraj): ""}
              </div>
              <div className="orderDetailsRow">
                <font className="bold">Miasto:</font> {(orderData.klient)? (orderData.klient.miasto): ""}
              </div>
              <div className="orderDetailsRow">
                <font className="bold">Kod pocztowy:</font> {(orderData.klient)? (orderData.klient.kodpocztowy): ""}
              </div>
              <div className="orderDetailsRow">
                <font className="bold">Ulica, numer budynku / lokalu:</font> {(orderData.klient)? (orderData.klient.ulica): ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="popupWrap">
        <h3>Edytuj zamówienie <font className="maincolor bold">#{zamowienieId}</font></h3>
          <div className="addNewOrderWrap">
            <div className="addNewOrderForm">

              <div className="orderDetails">
                <div className="input-group">
                  <input type="text" placeholder="Nazwa klienta" className="orderDetailsInput orderDetailsInputHalf" value={(clientDetails.klient)? clientDetails.klient.klient: ""} onChange={e => setClientDetails({...clientDetails, klient: {...clientDetails.klient, klient: e.target.value} })} required/>
                  <input type="text" placeholder="Numer telefonu" className="orderDetailsInput orderDetailsInputHalf" value={(clientDetails.klient)? clientDetails.klient.telefon: ""} onChange={e => setClientDetails({...clientDetails, klient: {...clientDetails.klient, telefon: e.target.value} })} required/>
              </div>
                <div className="input-group">
                  <input type="textarea" placeholder="Szczegóły zamówienia" className="orderDetailsInput" value={(clientDetails.klient)? clientDetails.klient.szczegolyKlienta: ""} onChange={e => setClientDetails({...clientDetails, klient: {...clientDetails.klient, szczegolyKlienta: e.target.value} })} required/>
                </div>
                <div className="input-group">
                  <input type="text" placeholder="Kraj" className="orderDetailsInput orderDetailsInputHalf" value={(clientDetails.klient)? clientDetails.klient.kraj: ""} onChange={e => setClientDetails({...clientDetails, klient: {...clientDetails.klient, kraj: e.target.value} })} required/>
                  <input type="text" placeholder="Nazwa ulicy, numer budynku / lokalu" className="orderDetailsInput orderDetailsInputHalf" value={(clientDetails.klient)? clientDetails.klient.ulica: ""} onChange={e => setClientDetails({...clientDetails, klient: {...clientDetails.klient, ulica: e.target.value} })} required/>
                </div>
                <div className="input-group">
                  <input type="text" placeholder="Miasto" className="orderDetailsInput orderDetailsInputHalf" value={(clientDetails.klient)? clientDetails.klient.miasto: ""} onChange={e => setClientDetails({...clientDetails, klient: {...clientDetails.klient, miasto: e.target.value} })} required/>
                  <input type="text" placeholder="Kod pocztowy" className="orderDetailsInput orderDetailsInputHalf" value={(clientDetails.klient)? clientDetails.klient.kodpocztowy: ""} onChange={e => setClientDetails({...clientDetails, klient: {...clientDetails.klient, kodpocztowy: e.target.value} })} required/>
                </div>
                <div className="input-group">
                  <select className="orderDetailsSelect" placeholder="Wybierz status" value={(clientDetails.zamowienie)? clientDetails.zamowienie.status: ""} onChange={e => setClientDetails({...clientDetails, zamowienie: {...clientDetails.zamowienie, status: e.target.value} })} required>
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
                    {(clientDetails.produkty)?.map((produkt2) => {
                      return (
                        <tr key={produkt2.id}>
                          <td>{produkt2.nazwaProduktu}</td>
                          <td>{produkt2.ilosc}</td>
                          <td>{produkt2.cenaSzt}</td>
                          <td>{
                              produkt2.ilosc * produkt2.cenaSzt
                            }</td>
                          <td className="removeProduct" onClick={() => removeProduct(produkt2.id)}>-</td>
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
              <span className="totalCost">Całkowita cena produktów - {(clientDetails.produkty)?.reduce((a,b) => a + (b.cenaSzt * b.ilosc || 0), 0)} zł</span>
            </div>
          </div>
          <div className="submitNewOrder">
            <button className="submitNewOrderBtn" onClick={() => saveOrderChanges()}>

              <span className="addOrderText">Zapisz</span>
            </button>
          </div>
        </div>
        </div>
      </Popup>

    </div>
  )
}

export default OrderPage;
