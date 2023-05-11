import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  products: [],

  loading: false,
  error: null,
  productDetails: [],
};


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (keyword) => {
      if (keyword) {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/products?keyword=${keyword}`
        );
        return data;
      } else {
        const { data } = await axios.get(`http://localhost:5000/api/v1/products`);
        return data;
      }
    }
  );