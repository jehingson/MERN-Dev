import React, { useContext } from 'react'
import {Switch, Route} from 'react-router-dom'
import Producto from './productos/Productos'
import PerfilProducto from './productos/PerfilProducto'
import Login from "./auth/Login"
import Register from "./auth/Register";
import Carrito from "./carrito/Carrito";
import Not404 from "./utils/not404/not404";
import Categorias from "./categorias/Categorias"
import CreateProducto from "./createProducto/CreateProducto";

import History from "./history/History";
import HistoryDetalle from "./history/HistoryDetalle";


import { GlobalState } from "context/GlobalState";

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

  


  return (
    <Switch>
      <Route path="/" exact component={Producto} />
      <Route path="/perfil/:id" exact component={PerfilProducto} />

      <Route path="/login" exact component={isLogged ? Not404 : Login}  />
      <Route path="/register" exact component={isLogged ? Not404 : Register} />

      <Route path="/categoria" exact component={isAdmin ? Categorias : Not404} />
      CreateProducto

      <Route path="/crear_producto" exact component={isAdmin ? CreateProducto : Not404} />
      <Route path="/edit_producto/:id" exact component={isAdmin ? CreateProducto : Not404} />

     
      <Route path="/historial" exact component={isLogged ? History : Not404 } />
      <Route path="/historial/:id" exact component={isLogged ? HistoryDetalle : Not404 } />


      <Route path="/carrito" exact component={Carrito} />

      <Route path="*" exact component={Not404} />
    </Switch>
  )
}

export default Pages
