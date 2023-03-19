import React, {useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icono/menu.svg'
import Close from './icono/close.svg'
import Cart from './icono/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart


    const logoutUser = async () =>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = '/'
    }

    const adminRouter = () =>{
        return(
            <>
            <li><Link to="/create_product">Create Product</Link></li>
            <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () =>{
        return(
            <>
            <li><Link to="/history">historial</Link></li>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }



  return (
    <div>
        <header>
            <div className='menu' >
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className='logo'>
                <h1>
                    <Link to="/">{isAdmin?'Admin':'Punky Store'}</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">{isAdmin?'Productos':'Store'}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter : <li><Link to="/login">Login Register</Link></li>
                }
                <li>
                    <img src={Close} alt ="" width="30" className='menu'/>
                </li>
            </ul>
            {
                isAdmin ? '': 
                <div className='cart-icon'>
                    {/* ESTE .LENGTH DEBERIA FUNCIONAR */}
                <span>{cart.length} 0 </span>
                <Link to="/">
                    <img src={Cart} alt="" width="30"/>
                </Link>
            </div>
            }
            
        </header>
    </div>
  )
}

export default Header