import {useState, useEffect} from 'react'
import axios from 'axios'

function ProductosAPI() {
	const [productos, setProductos] = useState([])
	const [callback, setCallback] = useState(false)
	const [category, setCategory] = useState('')
	const [sort, setSort] = useState('')
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [result, setResult] = useState(0)


	useEffect(() => {
		const getProductos = async () => {
		  const res = await axios.get(`/api/productos?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
		  setProductos(res.data.productos)
		  setResult(res.data.result)
		}
			getProductos()
		}, [callback, category, sort, search, page])

	return {
		productos: [productos, setProductos],
		callback: [callback, setCallback],
		category: [category, setCategory],
		sort: [sort, setSort],
		search: [search, setSearch],
		page: [page, setPage],
		result: [result, setResult]
	}
}

export default ProductosAPI
