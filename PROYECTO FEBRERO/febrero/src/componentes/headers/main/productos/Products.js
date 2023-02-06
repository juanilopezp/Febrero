import React, {useContext} from 'react'
import { GlobalState } from '../../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'

function Products() {
  const state = useContext(GlobalState)
  const [productos] = state.productosAPI.productos
  
  return (
    <div className='products'>
        {
          productos.map(product =>{
            return <ProductItem key={product._id} product = {product}/>
          })
        }
    </div>
  )
}

export default Products