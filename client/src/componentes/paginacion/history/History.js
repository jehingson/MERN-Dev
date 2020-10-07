import React, { useContext, useEffect } from 'react'
import { GlobalState } from "context/GlobalState";
import { Link } from "react-router-dom";
import axios from 'axios'

function History() {
  const state = useContext(GlobalState)
  const [history, setHistory] = state.userAPI.history
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token


  useEffect(() => {
    if(token){
      const getHistory = async() => {
        if(isAdmin){
          const res = await axios.get('/api/payment',{
            headers: {Authorization: token}
          })
          setHistory(res.data)
        }else{
          const res = await axios.get('/user/historial',{
            headers: {Authorization: token}
          })
          setHistory(res.data)
        }
        
        
      }
      getHistory()
    }
  },[token, isAdmin, setHistory])

  return (
    <div className="history-page">
      <h2>Historial</h2>
      <h4>Tu has ordenado {history.length}</h4>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Fecha de compra</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            history.map(items => (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td><Link to={`/historial/${items._id}`}>Ver</Link></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default History
