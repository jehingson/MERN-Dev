require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')

//middlewares
const app = express()
app.use(cookieParser())
app.use(cors())
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'tmp/'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})
app.use(multer({storage: storage}).single('file'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/subir'))
app.use('/api', require('./routes/productosRouter'))
app.use('/api', require('./routes/paymentRouter'))





// Connectando a la base de moongose
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI, 
  {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, 
err => {
  if(err) throw err;
  console.log('Connect is db...')
})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','build', 'index.html' ))
  })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is connect al port', PORT);
})

