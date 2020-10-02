import React, {useState, useContext} from 'react'
import {GlobalState} from "context/GlobalState";
import Bars from "./svg/bars-solid.svg";
import Cart from "./svg/cart.svg";
import Close from "./svg/times-solid.svg";
import { Link } from "react-router-dom";


function Header() {

  const value = useContext(GlobalState)


  return (
        <header>
          <div className="menu">
            <img src={Bars} alt="" width="30" />
          </div>
          <div className="logo">
            <h1>
              <Link to="/">JNGS TIENDA</Link>
            </h1>
          </div>
          <ul>
            <li><Link to="/">Productos</Link></li>
            <li><Link to="/login">Inicia - Registrar</Link></li>
            <li>
              <img src={Close} alt=""  width="20"className="menu" />
            </li>
          </ul>
          <div className="cart-icon">
            <span>0</span>
            <Link to="/carrito">
              <img src={Cart} alt="" width="30" />
            </Link>
          </div>
        </header>
  )
}

export default Header
