import React, {useContext, useEffect} from 'react'
import { GlobalState } from '../../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'

function Products() {
  const state = useContext(GlobalState)
  const [productos, setProductos] = state.productosAPI.productos
  const [isAdmin] = state.userAPI.isAdmin
  
 

  useEffect(()=>{
    const getProductos = async () =>{
      const res = await axios.get('/api/productos')
      setProductos(res.data.productos)
      }
    getProductos()
  }, [setProductos])

  return (
    <>
     <div className='products'>
        {
          productos.map(product =>{
            return <ProductItem key={product._id} product = {product} isAdmin={isAdmin}/>
          })
        }
      </div>
      {productos.length === 0 && <Loading/>}
      </>
    
  )
}

export default Products