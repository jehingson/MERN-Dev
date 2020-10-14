const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const cloudinary = require('cloudinary');
const fs = require('fs')

// subir imagenesa cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// subir imagen
router.post('/subir',auth, authAdmin, async (req, res) => {
  try {
      if(!req.file || Object.keys(req.file).length === 0 ) return res.status(400).json({msg: 'no se adjuntaron archivos.'})
      
      const file = req.file
      
      if(file.size > 1024*1024){
        removeTmp(file.path)
        return res.status(400).json({msg: 'Tamaño de archivo large'})
      }

      if(file.mimetype !== "image/jpeg" && file.mimetype !== 'image/png'){
        removeTmp(file.path)
        return res.status(400).json({msg: 'El formato de archivo es incorrecto'})
      }
      

      const result = await cloudinary.v2.uploader.upload(file.path, {folder: 'test'})

        removeTmp(file.path)
      res.json({
        public_id: result.public_id, 
        url: result.secure_url
      })


  } catch (err) {
    if(req.file.path){
      removeTmp(req.file.path)
    }
    return res.status(500).json({ msg: err.message })

  }
})

// Eiminar imagen 
router.post('/destroy', auth, authAdmin, async (req, res) => {
  try {
     const {public_id} = req.body
    if(!public_id)  return res.status(400).json({msg: "no hay imágenes seleccionadas"})

    await cloudinary.v2.uploader.destroy(public_id)

    res.json({msg: "Imagen Eliminada"})
      
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