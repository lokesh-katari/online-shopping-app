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
function App() {
  return (
 <>
 <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<ErrorPage/>}/>
            <Route path='/products/:id' element={<ProductDetails/>}/>
            <Route path='/products/search/:id' element={<ProductDetails/>}/>
            <Route path='/products/search' element={<FilteredProducts/>}/>
        
           
          </Routes>
          <Footer/>
        </BrowserRouter>

 </>
  );
}

export default App;
