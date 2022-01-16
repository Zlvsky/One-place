import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Styles/clients.css';
import { AuthLoginInfo }  from './../AuthComponents/AuthLogin';
import Popup from '../Components/Popup';
import Pagination from '../Components/Pagination';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

function Clients() {
  const ctx = useContext(AuthLoginInfo)
  const [newOrderSubmitted, setNewOrderSubmitted] = useState(false);
  const [clientsData, setClientsData] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false);
  const [filterId, setFilterId] = useState("");

  useEffect(() => {
    setNewOrderSubmitted(false)
    axios.get("http://localhost:5000/clients", {
      withCredentials: true
    }).then(res => {
      if (res.data != null) {
        setClientsData(res.data[0].map(t1 => ({...t1, ...res.data[1].find(t2 => t2.id_klienta === t1.id_klienta)})))
      }
    });
  }, [newOrderSubmitted]);

  console.log(clientsData)

  const ClientsTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const clientsFiltered = clientsData?.filter((val) => {
      if([val.klient.toLowerCase(), val.id_klienta + ''].some(r => r.includes(filterId))) {
        return val
      }
    }).reverse();
    const totalClients = clientsFiltered.length;
    const computedClients = clientsFiltered.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
    const computedClientsLength = computedClients.length;

    return (
      <>
      <div className="tableResultsWrap">
        <div className="resultsSpan">Wyświetlanie <font className="resultsBold">{computedClientsLength}</font> z <font className="resultsBold">{totalClients}</font> wyników</div>
        <Pagination
          total={totalClients}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={page => setCurrentPage(page)}
          />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID Klienta</th>
            <th>Nazwa klienta</th>
            <th>Telefon</th>
            <th>Miasto</th>
            <th>Ilość zamówień</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {computedClients.map((client, i) => {
            return (
            <tr key={i}>
              <td><font className="maincolor">#</font>{client.id_klienta}</td>
              <td>{client.klient}</td>
              <td>{client.telefon}</td>
              <td>{client.miasto}</td>
              <td>{client.iloscZamowien ? client.iloscZamowien: "0"}</td>
              <td className="maincolor">
                <Link to={`/klienci/${client.id_klienta}`}>
                <ReadMoreRoundedIcon />
                </Link>
              </td>
            </tr>
          )
          })}
        </tbody>
      </table>
      </>
    )
  }

  const AddClients = () => {
    const [clientDetails, setClientDetails] = useState({
      nazwaKlienta: "",
      szczegolyKlienta: "",
      telefon: "",
      kraj: "Polska",
      ulica: "",
      miasto: "",
      kodpocztowy: "",
      nazwaPracownika: ctx.username
    });

    const addNewOrder = () => {
      axios.post("http://localhost:5000/newclient", {
        clientDetails
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
            nazwaPracownika: ctx.username
          });
          setNewOrderSubmitted(true);
        }
      })
    }

    return (
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="popupWrap">
          <div className="productsSummary">
            <h3 className="productSummaryLeft">Dodaj nowego klienta</h3>
          </div>

          <div className="addNewOrderWrap">
            <div className="addNewOrderForm">
              <div className="orderDetails">
                <div className="input-group">
                  <input type="text" placeholder="Nazwa klienta" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.nazwaKlienta} onChange={e => setClientDetails({...clientDetails, nazwaKlienta: e.target.value})} required/>
                  <input type="text" placeholder="Numer telefonu" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.telefon} onChange={e => setClientDetails({...clientDetails, telefon: e.target.value})}  required/>
              </div>
                <div className="input-group">
                  <input type="textarea" placeholder="Szczegóły klienta" className="orderDetailsInput" value={clientDetails.szczegolyKlienta} onChange={e => setClientDetails({...clientDetails, szczegolyKlienta: e.target.value})}  required/>
                </div>
                <div className="input-group">
                  <input type="text" placeholder="Kraj" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.kraj} onChange={e => setClientDetails({...clientDetails, kraj: e.target.value})} required/>
                  <input type="text" placeholder="Nazwa ulicy, numer budynku / lokalu" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.ulica} onChange={e => setClientDetails({...clientDetails, ulica: e.target.value})}  required/>
                </div>
                <div className="input-group">
                  <input type="text" placeholder="Miasto" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.miasto} onChange={e => setClientDetails({...clientDetails, miasto: e.target.value})} required/>
                  <input type="text" placeholder="Kod pocztowy" className="orderDetailsInput orderDetailsInputHalf" value={clientDetails.kodpocztowy} onChange={e => setClientDetails({...clientDetails, kodpocztowy: e.target.value})} required/>
                </div>
              </div>
            </div>
          </div>

          <div className="submitWrap">
            <div className="submitNewOrder">
              <button className="submitNewOrderBtn" onClick={() => addNewOrder()}>
                <AddCircleOutlineRoundedIcon />
                <span className="addOrderText">Dodaj</span>
              </button>
            </div>
          </div>

        </div>
      </Popup>
    )
  }

  return (
    <div className="bodyWrap">
      <div className="contentOrderWrap clientsTableWrap">
        <div className="leftSide">
          <h1>Klienci</h1>
          <div className="orderNavWrap">
            <div className="addOrderWrap">
              <input type="text" placeholder="Szukaj po ID" onChange={e => setFilterId(e.target.value)} value={filterId} />
              <button
                className="addOrder"
                onClick={() => {
                  setButtonPopup(true)
                }}
                >
                <AddCircleOutlineRoundedIcon />
                <span className="addOrderText">Dodaj</span>
              </button>
            </div>
          </div>
          <div className="orderWrap">
            <ClientsTable />
          </div>
        </div>
      </div>

      <AddClients />
    </div>
  )
}

export default Clients;
