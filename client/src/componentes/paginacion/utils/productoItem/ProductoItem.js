import React from 'react'
import BtnRender from "./BtnRender";

function ProductoItem({ producto, isAdmin }) {
  return (
    <div className="producto_card">
      {
        isAdmin && <input type="checkbox" checked={producto.checked} />
      }
      <img src={producto.images.url} alt={producto.title} />
      <div className="producto_box">
        <h2 title={producto.title}>{producto.title}</h2>
        <span>${producto.price}</span>
        <p>{producto.description}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum omnis, modi porro</p>
      </div>
      
      <BtnRender producto={producto} />

    </div>
  )
}


export default ProductoItem
