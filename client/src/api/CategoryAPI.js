import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoryAPI(token) {
  const [categorias, setCategias] = useState([])
  const [callbackdos, setCallbackdos] = useState(false)


  useEffect(()=>{
    const getCategorias = async () => {
      const res = await axios.get('/api/category')
      setCategias(res.data)
    }

    getCategorias()

  },[callbackdos])


  return {
    categorias: [categorias, setCategias],
    callbackdos: [callbackdos, setCallbackdos]
  }
}

export default CategoryAPI
