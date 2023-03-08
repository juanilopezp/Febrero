import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './productos/Products'
import DetailProduct from './productos/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import OrderHistory from './history/OrderHistory'
import NotFound from './utils/NotFound/NotFound'
import { GlobalState } from '../../../GlobalState'
import OrderDetails from './history/OrderDetails'
import Categories from './categories/Categories'


function Paginas() {
  const state = useContext(GlobalState)
  const[isLogged] = state.userAPI.isLogged
  const[isAdmin] = state.userAPI.isAdmin


  return (
    <>
    <Routes>
      <Route path='/productos' element={<Products/>}/>
      <Route path='/detail/:id' element={<DetailProduct/>}/>
      <Route path='/login' element={isLogged ? <NotFound/> : <Login/>}/>
      <Route path='/register' element={isLogged ? <NotFound/>:<Register/>}/>
      <Route path='/history' element={isLogged ? <OrderHistory/> : <NotFound/>}/>
      <Route path='/category' element={isAdmin ? <Categories/> : <NotFound/>}/>
      <Route path='/history/:id' element={isLogged ? <OrderDetails/> : <NotFound/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </>
  )
}

export default Paginas