import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const cartItemsFromLocaltorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// console.log(orders.cartItems);
const AddressFromStorage = localStorage.getItem("ShippingInfo")
  ? JSON.parse(localStorage.getItem("ShippingInfo"))
  : "";
const PaymentInfoFromStorage = localStorage.getItem("PaymentInfo")
  ? JSON.parse(localStorage.getItem("PaymentInfo"))
  : "";
const initialState = {
  cartItems: cartItemsFromLocaltorage,
  shippingAddress: AddressFromStorage,
  paymentMethod: PaymentInfoFromStorage,
  loading: false,
  error: null,
  totalPrice: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const item = action.payload;
      console.log(state.cartItems);
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
    },
    setShippingInfo: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setPaymentInfo: (state, action) => {
      state.PaymentInfo = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    removeCartAfterOrderPlaced: (state) => {
      state.cartItems = [];
    },

    // ... your other reducers ...
  },
  extraReducers: {},
});

export const {
  addCartItems,
  removeItem,
  setPaymentInfo,
  setShippingInfo,
  setTotalPrice,
  removeCartAfterOrderPlaced,
} = CartSlice.actions;
export default CartSlice.reducer;

export const addToCart = (id, value) => async (dispatch, getState) => {
  console.log("clicked added to cart");
  const { data } = await axios.get(`/api/v1/products/${id}`);
  console.log("data", data);
  dispatch(
    addCartItems({
      product: data.productDetails._id,
      name: data.productDetails.name,
      price: data.productDetails.price,
      qty: value,
      countInStock: data.productDetails.stock,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  dispatch(removeItem(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const setShippingAddress = (address) => async (dispatch, getState) => {
  dispatch(setShippingInfo(address));
  localStorage.setItem(
    "ShippingInfo",
    JSON.stringify(getState().cart.shippingAddress)
  );
};
export const setCartItems = (address) => async (dispatch, getState) => {
  dispatch(removeCartAfterOrderPlaced(address));
  localStorage.removeItem("cartItems");
  // localStorage.setItem("cartItems",[]);
 
};
