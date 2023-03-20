import React, {useContext, useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'

function Products() {
  const state = useContext(GlobalState)
  const [productos, setProductos] = state.productosAPI.productos
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.productosAPI.cllback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsChecked] = useState (false)

  const handleCheck = (id) =>{
    productos.forEach(product=>{
      if(product._id === id) product.checked = !product.checked
    })
    setProductos([...productos])
  }
  const deleteProduct = async(id, public_id) =>{
    try {
     setLoading(true)
     const destroyImg = await axios.post('/api/delete', {public_id},{
       headers: {Authorization: token}
     })
     const deleteProduct = await axios.delete(`/api/products/${id}`,{
       headers: {Authorization: token}
     })

     await destroyImg
     await deleteProduct
     setCallback(!callback)
     setLoading(false)

    } catch (err) {
     alert(err.response.data.msg)
    }
 }

 const checkAll = () =>{
  productos.forEach(product =>{
    product.checked = !isCheck
  })
  setProductos([...productos])
  setIsChecked(!isCheck)
 }

 const deleteAll = () =>{
    productos.forEach(product =>{
      if(product.checked) deleteProduct(product._id, product.images.public_id)
    })
 }


 if(loading) return <div><Loading/></div>
  return (
    <>
    <Filters/>
    {
      isAdmin &&
      <div className='delete-all'>
          <span>Select all</span>
          <input type="checkbox" checked= {isCheck} onChange={checkAll}/>
          <button onClick={deleteAll}>Delete all</button>
      </div>
    }
     <div className='products'>
        {
          productos.map(product =>{
            return <ProductItem key={product._id} 
            product = {product}  isAdmin={isAdmin} 
            deleteProduct={deleteProduct} handleCheck={handleCheck}/>
          })
        }
      </div>
      {productos.length === 0 && <Loading/>}
      </>
    
  )
}

export default Products