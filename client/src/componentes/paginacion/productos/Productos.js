import React, { useContext, useState } from 'react'
import { GlobalState } from "context/GlobalState";
import ProductoItem from "../utils/productoItem/ProductoItem";
import Loading from "../utils/loading/Loading";
import axios from 'axios'
import Filter from './Filter'
import LoadMore from "./LoadMore"


function Productos() {
  const state = useContext(GlobalState)
  const [productos, setProductos] = state.ProductosAPI.productos;
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.ProductosAPI.callback 
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const handleChecked = (id) =>{
    productos.forEach(producto => {
      if(producto._id === id) producto.checked = !producto.checked
    })
    setProductos([...productos])
  }

  const deleteProducto = async(id, public_id) => {
    try{
      setLoading(true)
      const destroyImg =  axios.post('/api/destroy', {public_id},{
        headers: {Authorization: token}
      })

      const deleteProducto =  axios.delete(`/api/producto/${id}`,{
        headers: {Authorization: token}
      })

      await destroyImg
      await deleteProducto
      setCallback(!callback)
      setLoading(false)

    }catch (err){
      alert(err.response.data.msg)
    }
  }

  const checkAll = () => {
    productos.forEach(producto => {
      producto.checked = !isCheck
    })
    setProductos([...productos])
    setIsCheck(!isCheck)
  }

  const deleteAll = () => {
    productos.forEach(producto => {
      if(producto.checked) deleteProducto(producto._id, producto.images.public_id)
    })
  }

  if(loading) return <div className="productos"><Loading /></div>

  return (
    <>
    <Filter />
    {
      isAdmin && <div className="delete-all">
        <span>Seleccionar Todo</span>
        <input type="checkbox" checked={isCheck} onChange={checkAll} />
        <button onClick={deleteAll}>Eliminar Todo</button>
      </div>
    }
      <div className="productos">
        {
          productos.map(producto => {
            return <ProductoItem 
            key={producto._id} 
            producto={producto}
            isAdmin={isAdmin}
            deleteProducto={deleteProducto}
            handleChecked={handleChecked}
            />
          })
        }
      </div>
      <LoadMore />
      {
        productos.length === 0 && <Loading />
      }
    </>
  )
}

export default Productos
