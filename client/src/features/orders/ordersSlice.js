import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersServices from "./services/ordersServices;

const initialState = {};

export const getAllOrders = createAsyncThunk(
    "orders/getAll",
    async () => {
        const res = await ordersServices.getAllOrders();
        return res;
    }
)


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: {
        
    }
});

const { reducer } = ordersSlice;
export default reducer;