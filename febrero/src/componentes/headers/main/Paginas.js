import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './productos/Products'
import DetailProduct from './productos/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound/NotFound'

function Paginas() {
  return (
    <>
    <Routes>
      <Route path='/' element={Products}/>
      <Route path='/detail/:id' element={DetailProduct}/>
      <Route path="/login" element={Login}/>
      <Route path='/register' element={Register}/>
      <Route path='/cart' element={Cart}/>
    </Routes>
    </>
  )
}

export default Paginas