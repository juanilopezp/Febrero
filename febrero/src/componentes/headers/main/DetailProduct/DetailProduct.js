import React, {useContext, useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const[products] = state.productsAPI.products
    const [DetailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            });
        }
    },[params.id, products])
    
    if(DetailProduct.length === 0) return null
  return (
    <>
    <div className='detail'>
        <img src={DetailProduct.images.url} alt=''/>
        <div className='box-detail'>
            <div className='row'>
                <h2>{DetailProduct.title}</h2>
                <h6>#id:{DetailProduct.product_id}</h6>
            </div>
            <span>${DetailProduct.price}</span>
            <p> {DetailProduct.description}</p>
            <p> {DetailProduct.content}</p>
            <p>Sold: {DetailProduct.sold}</p>
            <Link to='/cart' className='cart' onClick={() => addCart(product)}>Comprar ahora</Link>
        </div>
    </div>
        <h2>Related products</h2>
        <div className='products'>
            {
                products.map(product =>{
                    return product.category === DetailProduct.category
                    ? <ProductItem key = {product._id} product={product}/> : null
                })
            }

        </div>
    <div>

    </div>
    </>
  )
}

export default DetailProduct