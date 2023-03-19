import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useNavigate, useParams} from 'react-router-dom'



const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: 'garcha',
  content: "poronga",
  category: '',
  _id: ''
}

function CreateProduct() {
  const state = useContext(GlobalState)
  const [product, setProduct] = useState(initialState)
  const [categories] = state.categoriesAPI.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false) 



  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token

  const history = useNavigate()
  const param = useParams()
  
  const [products] = state.productsAPI.products
  const [onEdit, setOnEdit] = useState(false)
  useEffect(() =>{
    if(param.id){
      products.forEach(product =>{
        setOnEdit(true)
        if(product._id === param.id){
          setProduct(product)
          setImages(product.images)
        } 
        
      })
      
    }else{
      setOnEdit(false)
      setProduct(initialState)
      setImages(false)
    }
  }, [param.id, products])
  const handleUpload = async e =>{
    e.preventDefault()
    try {
      if(!isAdmin) return alert("no sos admin, cap :/")
      const file = e.target.files[0]

      if(!file) if(!isAdmin) return alert("ese archivo no existe :/")

      if(file.size > 1024 * 1024) 
      return alert("archivo muy extenso :/")
      if(file.type !== 'image/jpeg' && file.type !== 'image/png') 
      return alert("formato de archivo equivocado :/")

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
      })
      setLoading(false)
      setImages(res.data)

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleDestroy = async ()=>{
    try {
      if(!isAdmin) return alert("no sos admin, cap :/")
      setLoading(true)
      await axios.post('/api/delete', {public_id: images.public_id},{
        headers: {Authorization: token}
      })
      setLoading(false)
      setImages(false)

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleChangeInput = e =>{
    const {name, value} = e.target
    setProduct({...product, [name]:value})
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    try {
      if(!isAdmin) return alert("no sos admin, cap :/")
      if(!images) return alert("no hay imagen :/")
      if(onEdit){
        await axios.put(`/api/products/${product._id}`, {...product, images},{
          headers: {Authorization: token}
        })
      }else{
        await axios.post('/api/products', {...product, images},{
          headers: {Authorization: token}
        })
      }


      
      setImages(false)
      setProduct(initialState)
      history('/')

    } catch (err) {
      alert (err.response.data.msg)
    }
  }


  const styleUpload = {
    display: images ? "block" : "none"
  }
  return (
    <div className='create_product'>
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload}/>
        {
          loading ? <div id="file_img" ><Loading/> </div>
          :<div id="file_img" style={styleUpload}>
            <img src={images ? images.url: '' } alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
      
        }
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input type="text" name="product_id" id="product_id"
          required value={product.product_id} onChange={handleChangeInput} disabled={onEdit}/>
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title"
          required value={product.title} onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="price">price</label>
          <input type="number" name="price" id="price"
          required value={product.price} onChange={handleChangeInput}/>
        </div>

        <div className="row">
          <label htmlFor="description">description</label>
          <textarea type="text" name="description" id="description"
          required value={product.description} rows="5" onChange={handleChangeInput} />
        </div>

        <div className="row">
          <label htmlFor="content">content</label>
          <textarea type="text" name="content" id="content"
          required value={product.content} rows="7" onChange={handleChangeInput}/>
        </div>

        <div className="row">
          <label htmlFor="categories">categories: </label>
          <select name="category" value={product.category} onChange={handleChangeInput}>
            <option value="">
              {
                categories.map(category =>(
                  <option value={category._id} key={category._id}> 
                    {category.name}
                  </option>
                ))
              }
            </option>
          </select>
        </div>
        <button type='submit'> {onEdit ?"Update": "Create"}</button>
      </form>
    </div>
  )
}

export default CreateProduct