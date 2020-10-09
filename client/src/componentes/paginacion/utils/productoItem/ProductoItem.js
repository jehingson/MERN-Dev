import React from 'react'
import BtnRender from "./BtnRender";


function ProductoItem({ producto, isAdmin, deleteProducto, handleChecked}) {

  
  return (
    <div className="producto_card">
      {
        isAdmin && <input type="checkbox" checked={producto.checked} onChange={() => handleChecked(producto._id)}  />
      }
      <img src={producto.images.url} alt={producto.title} />
      <div className="producto_box">
        <h2 title={producto.title}>{producto.title}</h2>
        <span>${producto.price}</span>
        <p>{producto.description}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum omnis, modi porro</p>
      </div>
      
      <BtnRender producto={producto} deleteProducto={deleteProducto} />

    </div>
  )
}


export default ProductoItem
