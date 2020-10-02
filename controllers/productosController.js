const Productos = require('../models/productoModel')

  class APIfeactures {
    constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
    }
    filtering(){
      const queryObj = {...this.queryString} // queryString = req.query

      const excludedFields = ['page', 'sort', 'limit']
      excludedFields.forEach(el => delete(queryObj[el]))


      let queryStr = JSON.stringify(queryObj)
      console.log(queryStr)
      queryStr = queryStr.replace(
        /\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match)
      
      // gte = mayor o igual 
      // lte = menor o igual 
      // lt = menor que 
      // gt = mayot que 
      this.query.find(JSON.parse(queryStr))

      return this;
    }
    sorting(){
      if(this.queryString.sort){
        //sort = ordenar1
        const sortBy = this.queryString.sort.split(",").join("");
        console.log('sort', sortBy)
        this.query = this.query.sort(sortBy)
      }else{
        this.query = this.query.sort("-createdAt")
      }

      return this;
    }

    pagination(){
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 9;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this
    }
  }

const productoCtrl = {
  getProducts: async (req, res) => {
    try {
      const feactiures = new APIfeactures(Productos.find(), req.query)
      .filtering()
      .sorting() 
      .pagination()
      const productos = await feactiures.query

      res.json({
        status: "success",
        result: productos.length,
        productos: productos
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createProducts: async (req, res) => {
    try {
      const {producto_id, title, price, description, content, images, category} = req.body
      if(!images) return res.status(400).json({msg: "sin carga de imagen"})

      const producto = await Productos.findOne({producto_id})
      if(producto) return res.status(400).json({msg: "este producto ya existe"})

      const newProducto = new Productos({
        producto_id, 
        title: title.toLowerCase(), 
        price, 
        description, 
        content, 
        images, 
        category
      })

      await newProducto.save()
      res.json({msg: "Producto nuevo creado!"})

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Productos.findByIdAndDelete(req.params.id)
      res.json({msg: "Producto Eliminado"})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateProducts: async (req, res) => {
    try {
      const {
        producto_id,
        title, 
        price, 
        description, 
        content, 
        images, 
        category} = req.body
      if (!images) return res.status(400).json({msg: "no hay imagene"})

      await Productos.findOneAndUpdate({_id: req.params.id}, {
        producto_id, 
        title: title.toLowerCase(), 
        price, 
        description, 
        content, 
        images, 
        category
      })

      res.json({msg: "Producto Actualizado"})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = productoCtrl