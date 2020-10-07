import React, { useContext } from 'react'
import { GlobalState } from "context/GlobalState";
import ProductoItem from "../utils/productoItem/ProductoItem";
import Loading from "../utils/loading/Loading";

function Productos() {
  const state = useContext(GlobalState)
  const [productos] = state.ProductosAPI.productos;
  const [isAdmin] = state.userAPI.isAdmin


  return (
    <>
      <div className="productos">
        {
          productos.map(producto => {
            return <ProductoItem 
            key={producto._id} 
            producto={producto}
            isAdmin={isAdmin}
            />
          })
        }
      </div>
      {
        productos.length === 0 && <Loading />
      }
    </>
  )
}

export default Productos
