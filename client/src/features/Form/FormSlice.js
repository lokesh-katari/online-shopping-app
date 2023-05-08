import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
    searchText:null,
    searchProducts:[],
    error: null,
    filter:{
        minPrice:'',
        maxPrice:''
    },
    category:''
  };
  export const searchResults = createAsyncThunk(
    'products/search',
    async (keyword) => {
      const {data} = await axios.get(`http://localhost:5000/api/v1/products?keyword=${keyword}`)
     ;
     
     return data;
   } 
  );

const formSlice = createSlice({
    name:'formslice',
    initialState,
    reducers:{
        setSearchText:(state,action)=>{
            state.searchText =action.payload;
            console.log(state.searchText);
        },
        setsearchResults:(state,action)=>{
            state.searchResults  =action.payload.data;
           
            console.log(state.searchResults);
        },
        setFilter:(state,action)=>{
            state.filter.minPrice = action.payload.minPrice;
            state.filter.maxPrice = action.payload.maxPrice;
        }
    },
    extraReducers:{
        [searchResults.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
          },
          [searchResults.fulfilled]: (state, action) => {
            state.loading = false;
            state.searchProducts=(action.payload.data);
            console.log('thios is form slice');
            console.log(state.searchProducts);
      
          },
          [searchResults.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          }
        }
    });


export const {setSearchText,setsearchResults,setFilter} = formSlice.actions;
export default formSlice.reducer;
