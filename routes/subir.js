const router = require('express').Router()
const cloudinay = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

// subir imagenesa cloudinary
cloudinay.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// subir imagen
router.post('/subir', auth, authAdmin, (req, res) => {
  try {
    console.log(req.files)
    if(!req.files || Object.keys(req.files).length === 0) return res.status(400).json({msg: 'no se adjuntaron archivos.'})

    const file = req.files.file
    if(file.size > 1024*1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({msg: 'tamaño demasiado grande'})
    }

    if(file.mimetype !== "image/jpeg" && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({msg: 'El formato de archivo es incorrecto'})
  }

    cloudinay.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async (err, result) => {
      if(err) throw err;
      
      removeTmp(file.tempFilePath)
      res.json({
        public_id: result.public_id, 
        url: result.secure_url
      })
    })


  } catch (err) {
    return res.status(500).json({ msg: err.message })

  }
})

// Eiminar imagen 
router.post('/destroy', auth, authAdmin, (req, res) => {
  try {
    const {public_id} = req.body
    if(!public_id)  return res.status(400).json({msg: "no hay imágenes seleccionadas"})

    cloudinay.v2.uploader.destroy(public_id, async (err, result) => {
      if(err) throw err;

      res.json({msg: "Imagen Eliminada"})
    })
      
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})

const removeTmp = (path) => {
  fs.unlink(path, err=> {
    if(err) throw err;
  })
}

module.exports = router