import React, {useState, useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icono/menu.svg'
import Close from './icono/close.svg'
import Cart from './icono/cart.svg'
import { Link } from 'react-router-dom'


function Header() {
    const value = useContext(GlobalState)
  return (
    <div>
        <header>
            <div className='menu' >
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className='logo'>
                <h1>
                    <Link to="/">Punky Store</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">Productos</Link></li>
                <li><Link to="/login">Login Register</Link></li>
                <li>
                    <img src={Close} alt ="" width="30" className='menu'/>
                </li>
            </ul>

            <div className='cart-icon'>
                <span>0</span>
                <Link to="/">
                    <img src={Cart} alt="" width="30"/>
                </Link>
            </div>
        </header>
    </div>
  )
}

export default Header