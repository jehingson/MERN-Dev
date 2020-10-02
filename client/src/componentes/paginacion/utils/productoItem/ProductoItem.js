import React from 'react'
import {Link} from 'react-router-dom'

function ProductoItem({ producto }) {
  return (
    <div className="producto_card">
      <img src={producto.images.url} alt={producto.title} />
      <div className="producto_box">
        <h2 title={producto.title}>{producto.title}</h2>
        <span>${producto.price}</span>
        <p>{producto.description}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum omnis, modi porro</p>
      </div>
      <div className="row_btn">
        <Link id="btn_comprar" to="#!" >
          Comprar
        </Link>
        <Link id="btn_vista" to={`/perfil/${producto._id}`} >
          Vista
        </Link>
      </div>
    </div>
  )
}


export default ProductoItem
