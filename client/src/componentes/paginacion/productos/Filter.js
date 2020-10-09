import React, {useContext} from 'react'
import { GlobalState } from 'context/GlobalState'

function Filter() {

  const state = useContext(GlobalState)
  const [categorias] = state.categoryAPI.categorias
  const [category, setCategory] = state.ProductosAPI.category
	const [sort, setSort] = state.ProductosAPI.sort
  const [search, setSearch] = state.ProductosAPI.search
  
  const handleCategory = e => {
    setCategory(e.target.value)
    setSearch('')
    console.log(e.target.value)
  }


  return (
    <div className= "filter_menu">
      <div className="row">
        <span>Filtrar: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value='' >Todos los productos</option>
          {
            categorias.map(categoria => (
              <option value={"category=" + categoria._id} key={categoria._id}>
                {categoria.name}
              </option>
            ))
          }
        </select>
      </div>

      <input type="text" value={search} placeholder="buscar" onChange={e => setSearch(e.target.value.toLowerCase())} />

      <div className="row sort">
        <span>ordenar por: </span>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value='' >Nuevo</option>
          <option value='sort=oldest' >antiguo</option>
          <option value='sort=-sold' >mejores ventas</option>
          <option value='sort=-price' >precio alto-bajo</option>
          <option value='sort=price' >precio bajo-alto</option>
        </select>
      </div>

    </div>
  )
}

export default Filter
