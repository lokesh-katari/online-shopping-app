import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
function App() {
  return (
 <>
 <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='*' element={<ErrorPage/>}/>
            <Route path='/products/:id' element={<ProductDetails/>}/>
            <Route path='/products?keyword=:keyword' element={<Products/>}/>
           
          </Routes>
          <Footer/>
        </BrowserRouter>

 </>
  );
}

export default App;
