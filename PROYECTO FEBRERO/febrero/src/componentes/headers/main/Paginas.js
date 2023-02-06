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
    <Routes>
      <Route path='/' exact component={Products}/>
      <Route path='/detail/:id' exact component={DetailProduct}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/register' exact component={Register}/>
      <Route path='/cart' exact component={Cart}/>
      <Route path='*' exact component={NotFound}/>
    </Routes>
  )
}

export default Paginas