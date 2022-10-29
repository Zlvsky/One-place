import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {},
    extraReducers: {
        
    }
});

const { reducer } = ordersSlice;
export default reducer;