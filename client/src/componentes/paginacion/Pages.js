import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Producto from './productos/Productos'
import PerfilProducto from './productos/PerfilProducto'
import Login from "./auth/Login"
import Register from "./auth/Register";
import Carrito from "./carrito/Carrito";
import Not404 from "./utils/not404/not404";

function Pages() {
  return (
    <Switch>
      <Route path="/" exact component={Producto} />
      <Route path="/perfil/:id" exact component={PerfilProducto} />

      <Route path="/login" exact component={Login}  />
      <Route path="/register" exact component={Register} />
      <Route path="/carrito" exact component={Carrito} />

      <Route path="*" exact component={Not404} />
    </Switch>
  )
}

export default Pages
