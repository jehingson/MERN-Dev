import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import { GlobalState } from "context/GlobalState";

function HistoryDetalle() {
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history
  const [historyDetails, setHistoryDetail] = useState([])

  const params = useParams()

  useEffect(() => {
    if(params.id){
      history.forEach(item => {
        if(item._id === params.id) setHistoryDetail(item)
      })
    }
  }, [params.id, history])

  console.log(historyDetails)

  if(historyDetails.length === 0) return null


  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Contry Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{historyDetails.address.recipient_name}</td>
            <td>{historyDetails.address.line1 + " - " + historyDetails.address.city}</td>
            <td>{historyDetails.address.postal_code}</td>
            <td>{historyDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>
      <table style={{margin: "30px 0px"}}>
        <thead>
          <tr>
            <th></th>
            <th>Productos</th>
            <th>cantidad</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          
            {
              historyDetails.cart.map(item => (
                <tr key={item._id} >
                <td><img src={item.images.url} alt="" /></td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$ {item.price * item.quantity}</td>
                </tr>
              ))
            }
            
          
        </tbody>
      </table>
    </div>
  )
}

export default HistoryDetalle
