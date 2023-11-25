import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import FilteredProducts from "./components/FilteredProducts";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import UserProfile from "./components/Users/UserProfile";
import ResetPassword from "./components/Users/ResetPassword";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import MyOrders from "./components/Cart/MyOrders";
// import { useSelector } from "react-redux";
// import AdminHome from "./components/Admin/AdminHome";

function App() {
  // const dispatch = useDispatch();
  // const isAdmin = useSelector((state) => state.userSlice.isAdmin);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/search/:id" element={<ProductDetails />} />
          <Route path="/products/search" element={<FilteredProducts />} />
          <Route path="/orders/cart" element={<Cart />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/orders/cart/checkout" element={<Checkout />} />
          <Route path="/reset/password/:token" element={<ResetPassword />} />
          {/* {isAdmin ? <Route path="/admin/dashboard" element={AdminHome} /> : ""} */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
