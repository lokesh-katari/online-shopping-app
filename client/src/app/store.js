import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/Products/Product';
import formSlice from '../features/Form/FormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products:productReducer,
    formslice:formSlice
  },
});
