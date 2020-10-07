import React, { useState, useContext } from 'react'
import { GlobalState } from 'context/GlobalState'
import axios from 'axios'

function Categorias() {

  const state = useContext(GlobalState)
  const [categorias] = state.categoryAPI.categorias
  const [category, setCategory] = useState('')
  const [token] = state.token
  const [callbackdos, setCallbackdos] = state.categoryAPI.callbackdos
  const [onEdit, setOnEdit] = useState(false)
  const [id, setID] = useState('')



  const createCategory = async (e) => {
    e.preventDefault()
    try {
      if (onEdit) {
        const res = await axios.put(`/api/category/${id}`, { name: category }, {
          headers: { Authorization: token }
        })
        alert(res.data.msg)
      } else {
        const res = await axios.post('/api/category', { name: category }, {
          headers: { Authorization: token }
        })
        alert(res.data.msg)
      }
      setOnEdit(false)
      setCategory('')
      setCallbackdos(!callbackdos)

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const editarCategory = async (id, name) => {
    setID(id)
    setCategory(name)
    setOnEdit(true)
  }

  const deleteCategory = async (id) =>{
    try{
      const res = await axios.delete(`/api/category/${id}`, {
        headers: {Authorization: token}
      })
      alert(res.data.msg)
      setCallbackdos(!callbackdos)
    } catch (err){
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="categorias">
      <form onSubmit={createCategory}>
        <label htmlFor="categoria">Categorias</label>
        <div className="grid">
          <input
            type="text"
            name="categoria"
            value={category}
            required
            onChange={e => setCategory(e.target.value)}
          />
          <button type="submit" >{onEdit ? "Editar" : "Guardar"}</button>
        </div>
      </form>

      <div className="col">
        {
          categorias.map(category => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button onClick={() => editarCategory(category._id, category.name)}>Editar</button>
                <button onClick={() => deleteCategory(category._id)} >Eliminar</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Categorias
