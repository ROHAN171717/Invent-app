import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout/Layout";
import ProductDetail from "./components/product/productDetail.js/ProductDetail";
import AddProduct from "./pages/addProduct/AddProduct";
import Forgot from "./pages/auth/Forgot";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import EditProduct from "./pages/editProduct/EditProduct";
import Home from "./pages/Home/Home";
import Contact from "./pages/contact/Contact";



function App() {

  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/resetpassword/:resetToken" element={<Reset/>}/>
        
        <Route
        path="/dashboard"
        element={
            <Layout>
              <Dashboard/>
            </Layout>
        }
        />

        <Route
        path="/add-product"
        element={
            <Layout>
              <AddProduct/>
            </Layout>
        }
        />

        <Route
        path="/product-detail/:id"
        element={
            <Layout>
              <ProductDetail/>
            </Layout>
        }
        />

        <Route
        path="/edit-product/:id"
        element={
            <Layout>
              <EditProduct/>
            </Layout>
        }
        />

        <Route
        path="/contact-us"
        element={
            <Layout>
              <Contact/>
            </Layout>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;