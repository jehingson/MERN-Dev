import React, {useState, useContext} from 'react'
import axios from 'axios'
import { GlobalState } from "context/GlobalState";
import Loading from '../utils/loading/Loading'

const initialState ={
  producto_id: '',
  title: '',
  price: 0,
  description: 'Aplicacion web de procesador de pagos con efectos CSS geniales, bibliotecas JavasCript con React y Node',
  content: 'bienvenidos a nuestro sitio web aqui podras encontrar aplicacionacion modernas para tiendas virtuales con procesadores de pado. Deseños UI/UX, React, Node.js y Diseños web optimizados',
  category: ''
}

function CreateProducto() {
  const state = useContext(GlobalState)
  const [producto, setProducto] = useState(initialState)
  const [categorias] = state.categoryAPI.categorias
  const [images, setimages] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token

  const handleUpload = async e => {
    e.preventDefault()
    try {
      console.log(isAdmin)
      if(!isAdmin) return alert("No eres un administrador.")
      const file = e.target.files[0]
      
      if(!file) return alert("Archivo no existe.")

      if(file.size > 1024*1024) return alert('Archivo muy grande.')

      if(file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('El formato del archivo es incorrecto.')
      
      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/subir', formData, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
      })
      setLoading(false)
      console.log(res)
      setimages(res.data)

    } catch (err) {
      alert(err.response.data.msg)
    }
  } 

  const styleUpload = {
    display: images ? "block" : "none"
  }


  return (
    <div className="create_producto">
      	  <div className="upload">
            <input type="file" name="file" id="file_up" onChange={handleUpload} />
            {
              loading ? <div id="file_img"><Loading /></div>
              : <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ''} alt="" />
              <span>x</span>
            </div>
            }
            
          </div>

          <form>
            <div className="row">
              <lable htmlFor="producto_id">producto ID</lable>
              <input 
                type="text" 
                name="producto_id" 
                id="producto_id" 
                required 
                value={producto.producto_id}
                />
            </div>

            <div className="row">
              <lable htmlFor="title">Titulo</lable>
              <input 
                type="text" 
                name="title" 
                id="title" 
                required 
                value={producto.title}
                />
            </div>

            <div className="row">
              <lable htmlFor="description">Descriccion</lable>
              <textarea 
                type="text" 
                name="description" 
                id="description" 
                required 
                value={producto.description}
                rows="5"
                />
            </div>

            <div className="row">
              <lable htmlFor="content">Contenido</lable>
              <textarea 
                type="text" 
                name="content" 
                id="content" 
                required 
                value={producto.content}
                rows="7"
                />
            </div>

            <div className="row">
              <lable htmlFor="category">Categoias: </lable>
              <select name="category" value={producto.category}>
                <option value="">Porfacor seleccione una categoria</option>
                {
                 categorias.map(category => (
                   <option value={category._id} key={category._id}>
                     {category.name}
                   </option>
                 ))
                }
              </select>
            </div>

            <button type="submit">Crear producto</button>
            
          </form>
    </div>
  )
}

export default CreateProducto
