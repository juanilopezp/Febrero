import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './productos/Products'
import DetailProduct from './DetailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import OrderHistory from './history/OrderHistory'
import NotFound from './utils/NotFound/NotFound'
import { GlobalState } from '../../GlobalState'
import OrderDetails from './history/OrderDetails'
import Categories from './categories/Categories'
import CreateProduct from './createProducts/CreateProduct'

function Paginas() {
  const state = useContext(GlobalState)
  const{isLogged : isLogged} = state.userAPI


  return (
    <>
    <Routes>

      <Route path='/' element={<Products/>}/>
      <Route path='/detail/:id' element={<DetailProduct/>}/>

      <Route path='/login' element={isLogged ? <NotFound/> : <Login/>}/>
      <Route path='/register' element={isLogged ? <NotFound/> : <Register/>}/>
      
      
      <Route path='/category' element={ <Categories/> }/>
      <Route path='/create_product' element={ <CreateProduct/>  }/>
      <Route path='/edit_product:id' element={<CreateProduct/> }/>
      
      <Route path='/history' element={isLogged ? <OrderHistory/> : <NotFound/>}/>
      <Route path='/history/:id' element={isLogged ? <OrderDetails/> : <NotFound/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </>
  )
}

export default Paginas