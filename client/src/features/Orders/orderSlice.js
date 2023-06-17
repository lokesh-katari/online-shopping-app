import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const AddressFromStorage = localStorage.getItem("ShippingInfo")
  ? JSON.parse(localStorage.getItem("ShippingInfo"))
  : "";
const cartItemsFromLocaltorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  shippingInfo: AddressFromStorage,
  phonenumber: "",
  orderItems: cartItemsFromLocaltorage,
  paymentInfo: { id: "payment id", status: "confirmed" },
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  orderStatus: "Processing",
  myorders:[]
};

export const createOrder = createAsyncThunk(
  "order/create",
  async ({
    shippingInfo,
    phonenumber,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  }) => {
    const { data } = await axios.post(
      `/api/v1/order/new`,
      {
        shippingInfo,
        phonenumber,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }
);
export const myOrders = createAsyncThunk("order/myorders", async () => {
  const { data } = await axios.get(`/api/v1/order/myOrders`);
  return data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // ... your other reducers ...
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("dispoatched order sucess");
      state.orderStatus = "Confirmed";
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [myOrders.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [myOrders.fulfilled]: (state={loading:false}, action) => {
      state.loading = false;
       state.myorders=action.payload.order
    },
    [myOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default orderSlice.reducer;
