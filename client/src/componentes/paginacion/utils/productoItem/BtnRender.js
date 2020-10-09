import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from "context/GlobalState";

function BtnRender({ producto, deleteProducto }) {
  const state = useContext(GlobalState)
  const [isAdmin] = state.userAPI.isAdmin
  const addCart = state.userAPI.addCart


  return (
    <div className="row_btn">
      {
        isAdmin ? <> <Link id="btn_comprar" to="#!" 
        onClick={() => deleteProducto(producto._id, producto.images.public_id)}>
          Eliminar
      </Link>
          <Link id="btn_vista" to={`/edit_producto/${producto._id}`} >
            Editar
      </Link>
        </>
          : <>
            <Link id="btn_comprar" to="#!" onClick={() => addCart(producto)} >
              Comprar
      </Link>
            <Link id="btn_vista" to={`/perfil/${producto._id}`} >
              Vista
      </Link>
          </>
      }

    </div>
  )
}

export default BtnRender
