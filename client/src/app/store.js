import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from '../features/ordersSlice';

const reducer = {
  orders: ordersReducer,
};

const store = configureStore({
  reducer: reducer
});
export default store;
