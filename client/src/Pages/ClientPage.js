import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Styles/clientPage.css";
import Popup from "../Components/Popup";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";

function ClientPage() {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [clientUpdated, setClientUpdated] = useState(false);

  const [clientDetails, setClientDetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/client_by_id?id=${clientId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data != null) {
          setClientUpdated(false);
          setClientData({
            client: res.data[0],
            orders: res.data[1],
            products: res.data[2],
          });
        }
      });
  }, [clientUpdated]);

  const saveOrderChanges = () => {
    axios
      .post(
        "http://localhost:5000/updateclient",
        {
          clientDetails,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "success") {
          setClientUpdated(true);
        }
      });
  };

  const ClientInfo = () => {
    return (
      <div>
        <div className="clientPageHeader">
          <h1>
            Client
            <font className="maincolor">#{clientId}</font>
          </h1>
          <h3>{clientData.client ? clientData.client.client : ""}</h3>
        </div>
        <div className="clientInfo">
          <div className="clientContactInfo">
            <span>Contant info</span>
            <div className="clientInfoGroup">
              <div className="clientInfoLabel">Email address</div>
              <div className="clientInfoText"></div>
            </div>
            <div className="clientInfoGroup">
              <div className="clientInfoLabel">Phone number</div>
              <div className="clientInfoText">
                {clientData.client ? clientData.client.phone : ""}
              </div>
            </div>
            <div className="clientInfoGroup">
              <div className="clientInfoLabel">Client details</div>
              <div className="clientInfoText">
                {clientData.client ? clientData.client.clientDetails : ""}
              </div>
            </div>
          </div>

          <div className="clientContactInfo">
            <span>Shipping info</span>
            <div className="clientInfoGroup">
              <div className="clientInfoLabel">Country</div>
              <div className="clientInfoText">
                {clientData.client ? clientData.client.country : ""}
              </div>
            </div>
            <div className="clientInfoGroup">
              <div className="clientInfoLabel">City</div>
              <div className="clientInfoText">
                {clientData.client ? clientData.client.city : ""}
              </div>
            </div>
            <div className="clientInfoGroup">
              <div className="clientInfoLabel">Postal code</div>
              <div className="clientInfoText">
                {clientData.client ? clientData.client.postalCode : ""}
              </div>
            </div>
            <div className="clientInfoGroup">
              <div className="clientInfoLabel">Street</div>
              <div className="clientInfoText">
                {clientData.client ? clientData.client.street : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ClientOrders = () => {
    return (
      <div className="clientOrdersWrap">
        <table>
          <thead>
            <tr>
              <th>Order id</th>
              <th>Date</th>
              <th>Status</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientData.orders
              ?.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>
                      <font className="maincolor">#</font>
                      {order.id}
                    </td>
                    <td>{order.date.split("T")[0]}</td>
                    <td className={order.status}>{order.status}</td>
                    <td>
                      {order.price}
                      zł
                    </td>
                    <td className="maincolor">
                      <Link to={`/orders/${order.id}`}>
                        <ReadMoreRoundedIcon />
                      </Link>
                    </td>
                  </tr>
                );
              })
              .reverse()}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className="bodyWrap">
      <div className="clientPageContentWrap">
        <div className="clientLeftWrap">
          <ClientInfo />
        </div>

        <div className="clientRightWrap">
          <div>
            <p>
              Client orders sum:
              <font className="maincolor">
                {clientData.orders
                  ? clientData.orders.reduce((a, b) => a + (b.price || 0), 0)
                  : "0"}
                zł
              </font>
            </p>
          </div>
          <ClientOrders />
        </div>
      </div>
    </div>
  );
}
export default ClientPage;
