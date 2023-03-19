import {useState} from 'react'



function ProductosAPI() {
    const[productos, setProductos] = useState ([])

  
    return {
        productos: [productos, setProductos]
    }
}

export default ProductosAPI