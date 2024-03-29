import React, {useContext, useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'



function OrderHistory() {
  const state = useContext(GlobalState)
  const [history, setHistory] = state.userAPI.history
  const [token] = state.token

  useEffect(() =>{
    if(token){
      const getHistory = async() =>{
          const res = await axios.get('/user/history',{
            headers: {Authorization: token}
          })
          setHistory(res.data)
        
      }
      getHistory()
    }
  }, [token, setHistory])


  return (
    <div className="history-page">
      <h2>History</h2>

      <h4>usted tiene {history.length} en orden</h4>

      
        <table>
          <thead>
            <tr>
              <th>Payment Id</th>
              <th>Date of Purchased</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              history.map(items =>(
                <tr key={items._id}>
                  <td>{items.paymentID}</td>
                  <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                  <td><Link to={`/history/${items._id}`}>ver</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      

    </div>
  )
}

export default OrderHistory