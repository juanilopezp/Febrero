import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
  const state = useContext(GlobalState)
  const addCart = state.userAPI.addCart
  return (
    <div className='row_btn'>
      
          
          <Link id='btn_buy' to="#!" >
                Comprar
            </Link>
            <Link id='btn_view' to={`/detail/${product._id}`}>
                Ver
            </Link>
          
         
           
    </div>
  )
}

export default BtnRender