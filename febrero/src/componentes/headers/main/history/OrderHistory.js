import React, {useContext} from 'react'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'

function OrderHistory() {
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history


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