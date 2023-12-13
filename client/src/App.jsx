import React, { useEffect, useState } from 'react';

import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Footer from './components/Footer';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Cosmetics from './pages/Cosmetics/Cosmetics';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Cart from './pages/Cart/Cart';
import ScrollToTop from './components/ScrollToTop';
import RegisterPage from './pages/Registration/Registration';
import LoginPage from './pages/Login/Login';
import AddGoods from './pages/AddGoods/AddGoods';
import Checkout from './pages/Checkout/Checkout';
import ContactAdmin from './pages/Contact/ContactAdmin';
import Orders from './pages/Orders/Orders';
import { useSelector } from 'react-redux';

function App() {
  const [productItems, setProductItems] = useState([]);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const { userRole } = useSelector((state) => state.FilterReducer);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/goods/getAllGoods');
        if (response.ok) {
          const products = await response.json();
          setProductItems(products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage productItems={productItems} />} />
        <Route
          path="/cosmetics"
          element={
            <Cosmetics
              productItems={productItems}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        {userRole === 'ADMIN' && (
          <>
            <Route path="/addgoods" element={<AddGoods productItems={productItems} setProductItems={setProductItems} />} />
            <Route path="/contactAdmin" element={<ContactAdmin />} />
            <Route path="/orders" element={<Orders />} />
          </>
        )}
      </Routes>
      {/*window.location.pathname !== '/login' && window.location.pathname !== '/registration' && <Footer />*/}
    </>
  );
}

export default App;
