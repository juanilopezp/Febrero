import React, {useContext} from 'react'
import { GlobalState } from '../../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'


function Products() {
  const state = useContext(GlobalState)
  const [productos] = state.productosAPI.productos
  
  return (
    <>
    <div className='products'>
        {
          productos.map(product =>{
            return <ProductItem key={product._id} product = {product}/>
          })
        }
    </div>
    {productos.length === 0 && <Loading/>}
    </>
  )
}

export default Products