import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './Styles/orderPage.css';
import Popup from '../Components/Popup';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

function OrderPage() {
  const {orderId} = useParams();
  const [orderData, setOrderData] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [deletedItems, setDeletedItems] = useState({ids: []});

  const [clientDetails, setClientDetails] = useState({});

  const [productDetails, setProductDetails] = useState({productName: "", amount: 1, itemPrice: 0, totalPrice: 0})

  useEffect(() => {
    axios.get(`http://localhost:5000/order_by_id?id=${orderId}&type=single`, {withCredentials: true}).then(res => {
      if (res.data != null) {
        setOrderUpdated(false);
        setOrderData({
          order: res.data[0],
          products: res.data[1],
          client: res.data[2]
        })
      }
    })
  }, [orderUpdated]);

  const removeProduct = (id) => {
    let array = clientDetails.products;
    const newList = array.filter((item) => item.id !== id);

    if (id !== -1) {
      setClientDetails({
        ...clientDetails,
        products: newList
      });
      setDeletedItems({
        ...deletedItems,
        ids: [
          ...deletedItems.ids,
          id
        ]
      });
    }
  }

  const saveOrderChanges = () => {
    axios.post("http://localhost:5000/updateorder", {
      clientDetails,
      orderId,
      deletedItems
    }, {withCredentials: true}).then(res => {
      if (res.data === 'success') {
        setOrderUpdated(true);
      }
    })
  }

  const OrderPageHeaderSection = () => {
    return (<div className="orderPageHeader">
      <h1>Order
        <font className="maincolor">
          #{orderId}</font>
      </h1>
    </div>)
  }

  const OrderPageContentSection = ({props}) => {
    return (<div className="orderPageSection">
      {props.children}
    </div>)
  }

  const ProductsSummaryTable = () => {
    return (<div className="productsSummary">
      <table>
        <thead>
          <tr>
            <th className="summaryHeader">Products</th>
            <th className="alignCenter">Amount</th>
            <th className="alignCenter">Price</th>
            <th className="alignCenter">Total price</th>
          </tr>
        </thead>
        <tbody>
          {
            (orderData.products)
              ?.map(product => {
                return (<tr key={product.id}>
                  <td>{product.productName}</td>
                  <td className="alignCenter">x{product.amount}</td>
                  <td className="alignCenter">{product.itemPrice}
                    zł</td>
                  <td className="alignCenter">{product.totalPrice}
                    zł</td>
                </tr>)
              })
          }
        </tbody>
      </table>
    </div>)
  }

  const OrderDetailsSection = () => {
    return (<div className="orderDetails">
      <div className="orderDetailsRow">
        <h3 className="summaryHeader">Client info</h3>
      </div>
      <div className="orderDetailsRow">
        <div className="orderDetailsLeft">
          Client name
        </div>
        <div className="orderDetailsRight">
          {
            (orderData.client)
              ? orderData.client.client
              : ""
          }
        </div>
      </div>
      <div className="orderDetailsRow">
        <div className="orderDetailsLeft">
          Phone number
        </div>
        <div className="orderDetailsRight">
          {
            (orderData.client)
              ? orderData.client.phone
              : ""
          }
        </div>
      </div>
      <div className="orderDetailsRow">
        <div className="orderDetailsLeft">
          Additional info
        </div>
        <div className="orderDetailsRight">
          {
            (orderData.client)
              ? orderData.client.clientDetails
              : ""
          }
        </div>
      </div>
    </div>)
  }

  const UserColumnSection = () => {
    return (<div className="userColumn">
      <h3 className="summaryHeader">Added by:</h3>
      <div className="userColumnRow">
        <div className="orderDetailsLeft">
          <p className="userInfo">{
              (orderData.order)
                ? orderData.order.workerName
                : ""
            }</p>
        </div>
        <div className="orderDetailsRight">
          <button className="editOrderButton" onClick={() => {
              setButtonPopup(true);
              setClientDetails(JSON.parse(JSON.stringify(orderData)));
              setDeletedItems({ids: []})
            }}>
            <EditRoundedIcon/>
            Edit</button>
        </div>
      </div>
    </div>)
  }

  const OrderSummarySection = () => {
    return (<div className="orderSummary orderDetails">
      <div className="orderDetailsRow">
        <div className="orderDetailsLeft">
          <h3 className="summaryHeader">Summary</h3>
        </div>
        <div className="orderDetailsRight">
          <span className={`orderStatusSummary ${ (orderData.order)
              ? orderData.order.status
              : ""}`}>
            {
              (orderData.order)
                ? orderData.order.status
                : ""
            }
          </span>
        </div>
      </div>
      <div className="orderDetailsRow">
        <div className="orderDetailsLeft">
          Date
        </div>
        <div className="orderDetailsRight">
          {
            (orderData.order)
              ? (orderData.order.date).split('T')[0]
              : ""
          }
        </div>
      </div>
      <div className="orderDetailsRow">
        <div className="orderDetailsLeft">
          Total price
        </div>
        <div className="orderDetailsRight">
          {
            (orderData.order)
              ? (orderData.order.price)
              : ""
          }
        </div>
      </div>
    </div>)
  }

  const OrderShippmentSection = () => {
    return (<div className="orderDetails deliveryDetails">
      <h3 className="summaryHeader">Shippment address</h3>
      <div className="orderDetailsRow">
        <font className="bold">Country:</font>
        {
          (orderData.client)
            ? (orderData.client.country)
            : ""
        }
      </div>
      <div className="orderDetailsRow">
        <font className="bold">City:</font>
        {
          (orderData.client)
            ? (orderData.client.city)
            : ""
        }
      </div>
      <div className="orderDetailsRow">
        <font className="bold">Postal code:</font>
        {
          (orderData.client)
            ? (orderData.client.postalCode)
            : ""
        }
      </div>
      <div className="orderDetailsRow">
        <font className="bold">Street, house number</font>
        {
          (orderData.client)
            ? (orderData.client.street)
            : ""
        }
      </div>
    </div>)
  }

  return (<div className="bodyWrap">
    <div className="orderPageContentWrap">
      <OrderPageHeaderSection/>
      <div className="orderPageSection">

        <div className="orderPageLeftSide">
          <ProductsSummaryTable/>
          <OrderDetailsSection/>
        </div>

        <div className="orderPageRightSide">
          <UserColumnSection/>
          <OrderSummarySection/>
          <OrderShippmentSection/>
        </div>

      </div>
    </div>

    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <div className="popupWrap">
        <h3>Edit order
          <font className="maincolor bold">#{orderId}</font>
        </h3>
        <div className="addNewOrderWrap">
          <div className="addNewOrderForm">

            <div className="orderDetails">
              <div className="input-group">
                <input type="text" placeholder="Client name" className="orderDetailsInput orderDetailsInputHalf" value={(
                    clientDetails.client)
                    ? clientDetails.client.client
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    client: {
                      ...clientDetails.client,
                      client: e.target.value
                    }
                  })} required="required"/>
                <input type="text" placeholder="Phone number" className="orderDetailsInput orderDetailsInputHalf" value={(
                    clientDetails.client)
                    ? clientDetails.client.phone
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    client: {
                      ...clientDetails.client,
                      phone: e.target.value
                    }
                  })} required="required"/>
              </div>
              <div className="input-group">
                <input type="textarea" placeholder="Order details" className="orderDetailsInput" value={(
                    clientDetails.client)
                    ? clientDetails.client.clientDetails
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    client: {
                      ...clientDetails.client,
                      clientDetails: e.target.value
                    }
                  })} required="required"/>
              </div>
              <div className="input-group">
                <input type="text" placeholder="Country" className="orderDetailsInput orderDetailsInputHalf" value={(
                    clientDetails.client)
                    ? clientDetails.client.country
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    client: {
                      ...clientDetails.client,
                      country: e.target.value
                    }
                  })} required="required"/>
                <input type="text" placeholder="Street, home number" className="orderDetailsInput orderDetailsInputHalf" value={(
                    clientDetails.client)
                    ? clientDetails.client.street
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    client: {
                      ...clientDetails.client,
                      street: e.target.value
                    }
                  })} required="required"/>
              </div>
              <div className="input-group">
                <input type="text" placeholder="City" className="orderDetailsInput orderDetailsInputHalf" value={(
                    clientDetails.client)
                    ? clientDetails.client.city
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    client: {
                      ...clientDetails.client,
                      city: e.target.value
                    }
                  })} required="required"/>
                <input type="text" placeholder="Postal code" className="orderDetailsInput orderDetailsInputHalf" value={(
                    clientDetails.client)
                    ? clientDetails.client.postalCode
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    client: {
                      ...clientDetails.client,
                      postalCode: e.target.value
                    }
                  })} required="required"/>
              </div>
              <div className="input-group">
                <select className="orderDetailsSelect" placeholder="Pick status" value={(
                    clientDetails.order)
                    ? clientDetails.order.status
                    : ""} onChange={e => setClientDetails({
                    ...clientDetails,
                    order: {
                      ...clientDetails.order,
                      status: e.target.value
                    }
                  })} required="required">
                  <option>Open</option>
                  <option>Closed</option>
                  <option>Shipped</option>
                </select>
              </div>
            </div>

            <div className="productDetails">
              <div className="newOrderTable">
                <table>
                  <thead>
                    <tr>
                      <th>Product name</th>
                      <th>Amount</th>
                      <th>Price</th>
                      <th>Total price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" placeholder="Product name" className="productDetailsInput" value={productDetails.productName} onChange={e => setProductDetails({
                            ...productDetails,
                            productName: e.target.value
                          })} required="required"/>
                      </td>
                      <td>
                        <input type="number" placeholder="1" className="productDetailsInput" value={productDetails.amount} onChange={e => setProductDetails({
                            ...productDetails,
                            amount: Number(e.target.value)
                          })} required="required"/>
                      </td>
                      <td>
                        <input type="number" placeholder="10.00" className="productDetailsInput" value={productDetails.itemPrice} onChange={e => setProductDetails({
                            ...productDetails,
                            itemPrice: Number(e.target.value)
                          })} required="required"/>
                      </td>
                      <td>
                        {(productDetails.itemPrice) * (productDetails.amount)}
                      </td>
                      <td></td>
                    </tr>
                    {
                      (clientDetails.products)
                        ?.map((product2) => {
                          return (<tr key={product2.id}>
                            <td>{product2.productName}</td>
                            <td>{product2.amount}</td>
                            <td>{product2.itemPrice}</td>
                            <td>{product2.amount * product2.itemPrice}</td>
                            <td className="removeProduct" onClick={() => removeProduct(product2.id)}>-</td>
                          </tr>)
                        })
                    }
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        <div className="submitWrap">
          <div className="productSummary">
            <div className="productSummaryLeft">
              <span className="addNewLine" onClick={() => {
                  setClientDetails({
                    ...clientDetails,
                    products: [
                      ...clientDetails.products,
                      productDetails
                    ]
                  })
                }}>+ Add next product</span>
            </div>
            <div className="productSummaryRight">
              <span className="totalCost">Total price of products - {
                  (clientDetails.products)
                    ?.reduce((a, b) => a + (b.itemPrice * b.amount || 0), 0)
                }
                zł</span>
            </div>
          </div>
          <div className="submitNewOrder">
            <button className="submitNewOrderBtn" onClick={() => saveOrderChanges()}>
              <span className="addOrderText">Save changes</span>
            </button>
          </div>
        </div>
      </div>
    </Popup>

  </div>)
}

export default OrderPage;
