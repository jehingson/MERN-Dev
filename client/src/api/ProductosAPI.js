import {useState, useEffect} from 'react'
import axios from 'axios'

function ProductosAPI() {
	const [productos, setProductos] = useState([])

	const getProductos = async () => {
		const res = await axios.get('/api/productos')
		setProductos(res.data.productos)
	}

	useEffect(() => {
		getProductos()
	}, [])

	return {
		productos: [productos, setProductos]
	}
}

export default ProductosAPI
