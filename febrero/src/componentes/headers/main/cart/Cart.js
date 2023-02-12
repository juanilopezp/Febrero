import React, {useContext} from 'react'
import {GlobalState} from '../../../../GlobalState'


function Cart() {
  const state = useContext(GlobalState)
  const [cart] = state.userAPI.cart
  
  if (cart.length === 0)
    return <h2> Cart empty </h2>
  return (
    <div>Cart</div>
  )
}

export default Cart