import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],

  loading: false,
  error: null,
  productDetails: [],
};
// const dispatch= useDispatch();
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (keyword) => {
    if (keyword) {
      const { data } = await axios.get(`/api/v1/products?keyword=${keyword}`);
      return data;
    } else {
      const { data } = await axios.get(`/api/v1/products`);
      return data;
    }
  }
);
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id) => {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ... your other reducers ...
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.data;
      console.log(state.products);
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getProductDetails.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDetails = action.payload.productDetails;
      console.log(state.productDetails);
    },
    [getProductDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;
