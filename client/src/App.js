import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import FilteredProducts from './components/FilteredProducts';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import UserProfile from './components/Users/UserProfile';
import ResetPassword from './components/Users/ResetPassword';
import Cart from "./components/Cart/Cart";



function App() {

 
  return (
 <>
 <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<ErrorPage/>}/>
            <Route path='/products/:id' element={<ProductDetails/>}/>
            <Route path='/products/search/:id' element={<ProductDetails/>}/>
            <Route path='/products/search' element={<FilteredProducts/>}/>
            <Route path='/orders/cart' element={<Cart/>}/>
            <Route path='/reset/password/:token' element={<ResetPassword/>}/>
        
           
          </Routes>
          <Footer/>
        </BrowserRouter>

 </>
  );
}

export default App;
