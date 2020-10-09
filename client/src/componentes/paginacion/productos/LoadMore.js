import React, {useContext} from 'react'
import { GlobalState } from "context/GlobalState";



function LoadMore() {

  const state = useContext(GlobalState)
  const [page, setPage] = state.ProductosAPI.page
  const [result] = state.ProductosAPI.result



  return (
    <div className="load_more">
      {
        result < page * 9 ? " " 
        : <button onClick={() => setPage(page+1)}>Cargar mas</button>
      }
    </div>
  )
}

export default LoadMore
