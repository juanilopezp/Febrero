import axios from 'axios'
import React, {useEffect, useState} from 'react'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    
    
    
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
        
    }, [token])
    const addCart = async (product) =>{
        if(!isLogged) return alert ("logueate para seguir comprando")

        const check = cart.every(item =>{
            return item._id !== product._id
    })
    if (check){
        setCart ([...cart, {...product, quantity: 1}])
    }else{
        alert ("este producto fue añadido a su carro")
    }}
    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    }

    
}

export default UserAPI