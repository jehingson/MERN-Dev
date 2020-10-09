const Categorias = require('../models/categoryModel')
const Productos = require('../models/productoModel')

const categoryCtrl = {
  getCategorias: async (req, res) => {
    try {
      const categorias = await Categorias.find()
      res.json(categorias)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createCategory: async (req, res) => {
    try {
      // solamente administrador puede crear, elimianr, actulizar categoria 
      // if usuario tiene role = 1 es administrador
      const { name } = req.body
      const categoria = await Categorias.findOne({name})

      if(categoria) return res.status(400).json({msg: "Esta categoria ya existe!"})

      const newCategoria = new Categorias({name}) 
      await newCategoria.save()

      res.json({msg: "Categoria Creada con Exito..."})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const productos = await Productos.findOne({category: req.params.id})
      if(productos) return res.status(400).json({msg: "por favor elimine todos los productos con una relación"})

      await Categorias.findByIdAndDelete(req.params.id)
      res.json({msg: "Categoria Eliminada!"}) 
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateCategory: async (req, res) => {
    try {
      const {name} = req.body
      await Categorias.findOneAndUpdate({_id: req.params.id}, {name})
      res.json({msg: "Categoria Actualizada!"}) 
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
  
}


module.exports = categoryCtrl