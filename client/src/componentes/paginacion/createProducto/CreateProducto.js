import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from "context/GlobalState";
import Loading from '../utils/loading/Loading';
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
  producto_id: '',
  title: '',
  price: 0,
  description: 'Aplicacion web de procesador de pagos con efectos CSS geniales, bibliotecas JavasCript con React y Node.js',
  content: 'bienvenidos a nuestro sitio web aqui podras encontrar aplicacionacion modernas para tiendas virtuales con procesadores de pado. Deseños UI/UX, React, Node.js y Diseños web optimizados',
  category: '',
  _id: ''
}

function CreateProducto() {
  const state = useContext(GlobalState)
  const [producto, setProducto] = useState(initialState)
  const [categorias] = state.categoryAPI.categorias
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token

  const history = useHistory()
  const param = useParams()
  const [productos] = state.ProductosAPI.productos;
  const [onEdit, setonEdit] = useState(false)
  const [callback, setCallback] = state.ProductosAPI.callback

  useEffect(() =>{
    setonEdit(true)
    if(param.id){
      productos.forEach(product => {
        if(product._id === param.id) {
          setProducto(product)
          setImages(product.images)
        }
      })
      
    }else{
      setonEdit(false)
      setProducto(initialState)
      setImages(false)
    }
  },[param.id, productos])


  const handleUpload = async e => {
    e.preventDefault()
    try {
      if (!isAdmin) return alert("No eres un administrador.")
      const file = e.target.files[0]

      if (!file) return alert("Archivo no existe.")

      if (file.size > 1024 * 1024) return alert('Archivo muy grande.')

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('El formato del archivo es incorrecto.')

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/subir', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      })
      setLoading(false)
      console.log('images' ,res)
      setImages(res.data)


    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      if(!isAdmin) return alert("No eres un administrador.")
      setLoading(true)
      await axios.post('/api/destroy', {public_id: images.public_id}, {
        headers: {Authorization: token}
      })
      setLoading(false)
      setImages(false)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleChangeInput =  e => {
    const {name, value} = e.target
    setProducto({...producto, [name]:value})
  }


  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (!isAdmin) return alert("No eres un administrador.")

      if (!images) return alert("No hay imagen subida")

      if(onEdit){
        await axios.put(`/api/producto/${producto._id}`, {...producto, images},{
          headers: {Authorization: token}
        })
      }else{
        await axios.post('/api/productos', {...producto, images},{
          headers: {Authorization: token}
        })
      }
      setCallback(!callback)
      history.push("/")
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
              <span onClick={handleDestroy}>x</span>
            </div>
        }

      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="producto_id">producto ID</label>
          <input
            type="text"
            name="producto_id"
            id="producto_id"
            required
            value={producto.producto_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={producto.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Precio</label>
          <input
            type="Number"
            name="price"
            id="price"
            required
            value={producto.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Descriccion</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={producto.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Contenido</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={producto.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="category">Categoias: </label>
          <select name="category" value={producto.category} onChange={handleChangeInput} >
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

          <button type="submit">{ onEdit ? "Editar" : "Crear producto" }</button>

      </form>
    </div>
  )
}

export default CreateProducto