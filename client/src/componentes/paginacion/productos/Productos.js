import React, { useContext } from 'react'
import {GlobalState} from "context/GlobalState";
import ProductoItem from "../utils/productoItem/ProductoItem";

function Productos() {
  const state = useContext(GlobalState)
  const [productos] = state.ProductosAPI.productos;
  


  return (
    <div className="productos">
      {
        productos.map(producto => {
          return <ProductoItem key={producto._id} producto={producto} />
        })
      }
    </div>
  )
}

export default Productos
