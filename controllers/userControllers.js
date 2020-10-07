const Usuarios = require('../models/userModel')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
  register: async (req, res) => {
    try {
      const {name, email, password} = req.body
      const usuario = await Usuarios.findOne({email})
      if(usuario) return res.status(400).json({msg: "El correo electronico ya existe!"})

      if(password.length < 6)
        return res.status(400).json({msg: "Contraseña debe ser mayor a 6 caractere!"})
      
      // Encryptar contraseña 
      const passwordHash = await bcrypt.hash(password, 10)

      const newUsuario = new Usuarios({
        name, email, password:passwordHash
      })
      console.log(newUsuario)
      // Guardar en mongondb
      await newUsuario.save()


      // crear el jsonwebtoken para autenticacion
      const accesstoken = createAccessToken({id: newUsuario._id})

      const refreshtoken = createRefreshToken({id: newUsuario._id})

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 // 7d
      })

      res.json(accesstoken)
      //res.json({msg: "Registro con Exito!"})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async (req, res) => { 
    try {
      const {email, password} = req.body

      const usuario = await Usuarios.findOne({email})
      if(!usuario) return res.status(400).json({msg: "Correo electronico no existe!"})

      const isMatch = await bcrypt.compare(password, usuario.password)

      if(!isMatch) return res.status(400).json({msg: "Contraseña Incorrecta!"})

      // si acceso es correcto, creamos el token para el acceso

      const accesstoken = createAccessToken({id: usuario._id})

      const refreshtoken = createRefreshToken({id: usuario._id})

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 // 7d
      })

      res.json(accesstoken)

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', {
        path: '/user/refresh_token'
      })
      return res.json({msg: "desconectado"})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
    if(!rf_token) return res.status(400).json({msg: "Porfavor debe ingresar o registrarse primero!"})

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, usuario) => {

        if(err) return res.status(400).json({msg: "Porfavor debe ingresar o registrarse primero!"})

        const accesstoken = createAccessToken({id: usuario.id})
      
        res.json({accesstoken})
      })
      
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUser: async (req, res) => {
    try {
      const usuario = await Usuarios.findById(req.usuario.id).select('-password')
      if(!usuario) return res.status(400).json({msg: "User does not exist"}) 

      res.json(usuario)
      
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  addCart: async (req, res) => {
    try {
      console.log(req.usuario.id)
      const user = await Usuarios.findById(req.usuario.id)
      console.log('user', user)

      if(!user) return res.status(400).json({msg: "El usuario no existe!"})

      await Usuarios.findOneAndUpdate({_id: req.usuario.id},{
        cart: req.body.cart
      })
      return res.json({msg: "Agregado al carrito"})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payments.find({user_id: req.usuario.id})
      res.json(history)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

createAccessToken = (usuario) => {
  return jwt.sign(usuario, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

createRefreshToken = (usuario) => {
  return jwt.sign(usuario, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl