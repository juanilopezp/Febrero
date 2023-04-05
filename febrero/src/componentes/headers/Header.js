import React, {useContext, useState} from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icono/menu.svg'
import Close from './icono/close.svg'
import Cart from './icono/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged

    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = '/';
    }
    const loggedRouter = () =>{
        return(
            <>
            <li><Link to="/history">historial</Link></li>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            <li><Link to="/create_product">Create Product</Link></li>
            <li><Link to="/category">Categories</Link></li>
            </>
        )
    }


    const styleMenu ={
        left: menu ? 0 : "-100%"
    }

  return (
        <header>
            <div className='menu' onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className='logo'>
                <h1>
                    <Link to="/">Punky Store</Link>
                </h1>
            </div>
 
            <ul style={styleMenu}>
                <li><Link to="/">Store</Link></li>
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
                }
                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt ="" width="30" className='menu'/>
                </li>
            </ul>
            
                <div className='cart-icon'>
                    
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30"/>
                    </Link>
                </div>
            
            
        </header>
  )
}

export default Header