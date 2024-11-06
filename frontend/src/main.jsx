//import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ShopContextProvider>
      <App />
      </ShopContextProvider>
  </BrowserRouter>,
)
