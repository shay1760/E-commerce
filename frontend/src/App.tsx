//import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Card';
import Search from './pages/Search';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </Router>
  )
}

export default App
