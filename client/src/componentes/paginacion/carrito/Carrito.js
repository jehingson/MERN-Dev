import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from 'context/GlobalState'
import { Link } from 'react-router-dom'
import axios from "axios";
import PaypalButton from './PaypalButton'

function Carrito() {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const totall = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(totall)
    }
    getTotal()
  },[cart])

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart', {cart},{
      headers: {Authorization: token}
    })
  }


  const increment = (id) => {
    cart.forEach(item => {
      if(item._id === id){
        item.quantity +=1;
        
      }
    })
    setCart([...cart])
    addToCart(cart) 
    console.log(cart)
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if(item._id === id){
        item.quantity === 1 ? item.quantity = 1: item.quantity -=1;
      }
    })
    setCart([...cart])
    addToCart(cart)
  }
  
  const removeProducto = id => {
    if(window.confirm('¿Quieres suspender este producto?')){
      cart.forEach((item, index) => {
        if(item._id === id){
          cart.splice(index, 1)
        }
      })
      setCart([...cart])
      addToCart(cart)
    }
  }

  const  tranSuccess = async (payment) => {

    const {paymentID, address} = payment;
    await axios.post('/api/payment',{
      cart, paymentID, address
    },{
      headers: {Authorization: token}
    })
    
    setCart([])
    addToCart([])
    alert('Has realiazado correctamente tu pedido.')
  }

  if (cart.length === 0)
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Carrito Vacio</h2>



  return (
    <div>
      {
        cart.map(producto => (
          <div className="perfil cart" key={producto.producto_id}>
            <img src={producto.images.url} alt={producto.title} />
            <div className="box-perfil">

              <h2>{producto.title}</h2>

              <h3>$ {producto.price * producto.quantity}</h3>
              <p>{producto.description}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum omnis, modi porro</p>
              <p>{producto.content}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum omnis, modi porro Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum omnis, modi porro</p>
              <p>sold: {producto.sold}</p>

              <div className="cantidad">
                <button onClick={() => decrement(producto._id)}> - </button>
                <span>{producto.quantity}</span>
                <button onClick={() => increment(producto._id)}> + </button>
              </div>

              <div 
              className="delete" 
              onClick={() => removeProducto(producto._id)}>
                 x 
              </div>

            </div>
          </div>
        )
        )
      }
      <div className="total">
    <h3>Total: $ {total}</h3>
        <Link to="#!">Payment</Link>
        <PaypalButton 
          total={total}
          tranSuccess={tranSuccess}
        />
      </div>
    </div>
  )
}

export default Carrito
