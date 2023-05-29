import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/Products/Product';
import formSlice from '../features/Form/FormSlice';
import UserSlice from '../features/User/UserSlice';
import CartSlice from '../features/Cart/cart';
import orderSlice from '../features/Orders/orderSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products:productReducer,
    formslice:formSlice,
    userSlice:UserSlice,
    cart:CartSlice,
    orders:orderSlice

  },
});
