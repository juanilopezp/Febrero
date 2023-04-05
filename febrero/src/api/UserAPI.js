import axios from 'axios'
import React, {useEffect, useState} from 'react'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
  
    
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    setCart(res.data.cart)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
        
    }, [token])

    useEffect(()=>{
        if(token){
            const getHistory = async()=>{
                const res = await axios.get('/user/history', {
                    headers: {Authorization: token}
                })
                setHistory(res.data)
            }
            getHistory()
        }
    },[token])

    const addCart = async (product) =>{
        if(!isLogged) return alert ("logueate para seguir comprando")

        const check = cart.every(item =>{
            return item._id !== product._id
    })
    if (check){
        setCart ([...cart, {...product, quantity: 1}])

        await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]},{
            headers: {Authorization: token}
        })
    }else{
        alert ("este producto fue añadido a su carro")
    }}
    
    return {
        isLogged: [isLogged, setIsLogged],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }

    
}

export default UserAPI