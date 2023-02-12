import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './productos/Products'
import DetailProduct from './productos/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound/NotFound'
import { GlobalState } from '../../../GlobalState'


function Paginas() {
  const state = useContext(GlobalState)
  const[isLogged] = state.userAPI.isLogged
  return (
    <>
    <Routes>
      <Route path='/productos' element={<Products/>}/>
      <Route path='/detail/:id' element={<DetailProduct/>}/>
      <Route path='/login' element={isLogged ? <NotFound/> : <Login/>}/>
      <Route path='/register' element={isLogged ? <NotFound/>:<Register/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </>
  )
}

export default Paginas