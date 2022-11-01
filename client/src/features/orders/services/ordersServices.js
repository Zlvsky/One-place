import axios from "axios";

const localhost = "http://localhost:5000/";
const credentials = { withCredentials: true };

class ordersServices {
    getOrders() {
        return axios.get(localhost + "orders", credentials);
    }
}

export default new ordersServices();