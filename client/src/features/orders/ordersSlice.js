import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersServices from "./services/ordersServices";

const initialState = [];

export const getAllOrders = createAsyncThunk(
    "orders/getAll",
    async () => {
        const res = await ordersServices.getAllOrders();
        return res.data;
    }
)


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: {
        [getAllOrders.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const { reducer } = ordersSlice;
export default reducer;