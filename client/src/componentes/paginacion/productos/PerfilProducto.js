import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "context/GlobalState";
import ProductoItem from "../utils/productoItem/ProductoItem"

function PerfilProducto() {
  const params = useParams()
  const state = useContext(GlobalState)
  const [productos] = state.ProductosAPI.productos
  const [perfilProducto, setProductoPerfil] = useState([])
  const addCart = state.userAPI.addCart


  useEffect(() => {
    if (params.id) {
      console.log('re render')
      productos.forEach(producto => {
        if (producto._id === params.id) setProductoPerfil(producto)
      })
    }
  }, [params.id, productos])

  if (perfilProducto.length === 0) return null

  return (
    <>
    <div className="perfil">
      <img src={perfilProducto.images.url} alt={perfilProducto.title} />
      <div className="box-perfil">
        <div className="row">
          <h2>{perfilProducto.title}</h2>
          <h6>#id: {perfilProducto.producto_id}</h6>
        </div>
        <span>$ {perfilProducto.price}</span>
        <p>{perfilProducto.description}</p>
        <p>{perfilProducto.content}</p>
        <p>sold: {perfilProducto.sold}</p>
        <Link to="/carrito" className="carrito" onClick={() => addCart(perfilProducto)} >Comprar ahora</Link>
      </div>
    </div>
    <div>
      <h2>Productos Relacionados</h2>
      <div className="productos">
        {
          productos.map(producto => {
            return producto.category === perfilProducto.category 
            ? <ProductoItem key={producto._id} producto={producto} />
            : null
          })
        }
      </div>
    </div>
    </>
  )
}

export default PerfilProducto
