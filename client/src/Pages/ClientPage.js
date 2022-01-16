import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Styles/clientPage.css';
import Popup from '../Components/Popup';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';


function ClientPage() {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [clientUpdated, setClientUpdated] = useState(false);


  const [clientDetails, setClientDetails] = useState({});


  useEffect(() => {
    axios.get(`http://localhost:5000/client_by_id?id=${clientId}`, {
      withCredentials: true
    }).then(res => {
      if(res.data != null) {
        setClientUpdated(false);
        setClientData(res.data)
      }
    })
  }, [clientUpdated]);

  const saveOrderChanges = () => {
    axios.post("http://localhost:5000/updateclient", {
      clientDetails
    }, {
      withCredentials: true
    }).then(res => {
      if(res.data === 'success') {
        setClientUpdated(true);
      }
    })
  }

  const ClientInfo = () => {
    return (
      <div>
      <div className="clientPageHeader">
        <h1>Klient <font className="maincolor"> #{clientId}</font></h1>
        <h3>{(clientData.klient) ? clientData.klient.klient : ""}</h3>
      </div>
      <div className="clientInfo">

        <div className="clientContactInfo">
          <span>Informacje kontaktowe</span>
          <div className="clientInfoGroup">
            <div className="clientInfoLabel">
              Adres Email
            </div>
            <div className="clientInfoText">

            </div>
          </div>
          <div className="clientInfoGroup">
            <div className="clientInfoLabel">
              Numer telefonu
            </div>
            <div className="clientInfoText">
              {(clientData.klient) ? clientData.klient.telefon : ""}
            </div>
          </div>
          <div className="clientInfoGroup">
            <div className="clientInfoLabel">
              Szczegóły klienta
            </div>
            <div className="clientInfoText">
              {(clientData.klient) ? clientData.klient.szczegolyKlienta : ""}
            </div>
          </div>
        </div>

        <div className="clientContactInfo">
          <span>Informacje wysyłkowe</span>
          <div className="clientInfoGroup">
            <div className="clientInfoLabel">
              Kraj
            </div>
            <div className="clientInfoText">
              {(clientData.klient) ? clientData.klient.kraj : ""}
            </div>
          </div>
          <div className="clientInfoGroup">
            <div className="clientInfoLabel">
              Miasto
            </div>
            <div className="clientInfoText">
              {(clientData.klient) ? clientData.klient.miasto : ""}
            </div>
          </div>
          <div className="clientInfoGroup">
            <div className="clientInfoLabel">
              Kod Pocztowy
            </div>
            <div className="clientInfoText">
              {(clientData.klient) ? clientData.klient.kodpocztowy : ""}
            </div>
          </div>
          <div className="clientInfoGroup">
            <div className="clientInfoLabel">
              Ulica
            </div>
            <div className="clientInfoText">
              {(clientData.klient) ? clientData.klient.ulica : ""}
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }

  const ClientOrders = () => {

    return (
      <div className="clientOrdersWrap">
      <table>
        <thead>
          <tr>
            <th>Numer zamówienia</th>
            <th>Data</th>
            <th>Status</th>
            <th>Cena</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientData.zamowienia?.map(order => {
            return (
            <tr key={order.id}>
              <td><font className="maincolor">#</font>{order.id}</td>
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
        }).reverse()}
        </tbody>
      </table>
      </div>
    )
  }
  return (
    <div className="bodyWrap">
      <div className="clientPageContentWrap">

        <div className="clientLeftWrap">
          <ClientInfo />
        </div>

        <div className="clientRightWrap">
          <div>
            <p>Łączna suma zamówień klienta: <font className="maincolor">{clientData.zamowienia ? clientData.zamowienia.reduce((a,b) => a + (b.cena || 0), 0) : "0"} zł </font></p>
          </div>
          <ClientOrders />
        </div>

      </div>
    </div>
  )
}
export default ClientPage;
