import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
function App() {
  return (
 <>
 <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>

 </>
  );
}

export default App;
