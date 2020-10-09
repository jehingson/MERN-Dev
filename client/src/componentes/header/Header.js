import React, { useContext, useState } from 'react'
import { GlobalState } from "context/GlobalState";
import Bars from "./svg/bars-solid.svg";
import Cart from "./svg/cart.svg";
import Close from "./svg/times-solid.svg";
import { Link } from "react-router-dom";
import axios from 'axios'

function Header() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  const [cart] = state.userAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    await axios.get('/user/logout')

    localStorage.removeItem('Session')
    
    window.location.href = "/";
  }

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/crear_producto">Crear Productos</Link></li>
        <li><Link to="/categoria">Categoria</Link></li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/historial">Historial</Link></li>
        <li><Link to="/" onClick={logoutUser}>Salir</Link></li>
      </>
    )
  }

  const styleMenu = {
    left: menu ? 0 : "-100%"
  }

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Bars} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? 'Admin' : 'TIENDA'}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li><Link to="/">{isAdmin ? 'Productos' : 'productos'}</Link></li>

        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() 
          : <li><Link to="/login">Inicia - Registrar</Link></li>
        }

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="20" className="menu" />
        </li>
      </ul>
      {
        isAdmin ? '' 
        : <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/carrito">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      }

    </header>
  )
}

export default Header
