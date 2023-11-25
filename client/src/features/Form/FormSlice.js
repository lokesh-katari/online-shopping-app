import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  searchText: null,
  searchProducts: [],
  error: null,
  filter: {
    minPrice: "",
    maxPrice: "",
  },
  category: "",
  Cpage: 1,
  totalProductsCount: 0,
};
export const searchResults = createAsyncThunk(
  "products/search",
  async ({
    keyword = "",
    Cpage = "1",
    price = [0, 25000],
    category,
    ratings = 0,
  }) => {
    let url;
    if (category) {
      url = `/api/v1/products?keyword=${keyword}&minPrice=${price[0]}&maxPrice=${price[1]}&category=${category}&page=${Cpage}&ratings=${ratings}&limit=5`;
    } else {
      url = `/api/v1/products?keyword=${keyword}&minPrice=${price[0]}&maxPrice=${price[1]}&page=${Cpage}&limit=5`;
      console.log(url);
      console.log(Cpage);
    }
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  }
);

const formSlice = createSlice({
  name: "formslice",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      console.log(state.searchText);
    },
    resetSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setFilter: (state, action) => {
      state.filter.minPrice = action.payload.minPrice;
      state.filter.maxPrice = action.payload.maxPrice;
    },
    setPageNo: (state, action) => {
      state.Cpage = action.payload;
    },
  },
  extraReducers: {
    [searchResults.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [searchResults.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchProducts = action.payload.data;
      state.totalProductsCount = action.payload.totalProductsCount;
    },
    [searchResults.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { setSearchText, setFilter, Cpage, resetSearchText } =
  formSlice.actions;
export default formSlice.reducer;
