const Usuarios = require('../models/userModel')


const authAdmin = async (req, res, next) => {
  try {
    // Get user informacion by id
    const usuario = await Usuarios.findOne({_id: req.usuario.id})
   
    if(usuario.role === 0 )
      return res.status(400).json({msg: "acceso a recursos de administrador denegado"})

      next()
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = authAdmin