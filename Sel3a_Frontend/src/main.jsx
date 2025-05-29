import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import './Assets/Fonts/fonts.css'


import HomePage from '@pages/HomePage'
import ProductPage from '@pages/ProductPage'
import SearchPage from '@pages/SearchPage'
import OrdersPage from '@pages/OrdersPage'

import JoinUs from '@pages/JoinUs'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/orders" element={<OrdersPage/>} />
        <Route path="/product/:productId" element={<ProductPage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/partners/join-us" element={<JoinUs/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
