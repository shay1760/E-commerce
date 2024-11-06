import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Product from './pages/Product';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import About from './pages/About';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';
import Verify from './pages/Verify.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'> {/* Corrected px class */}
      <ToastContainer/>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
