require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
  useTempFiles: true
}))


// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/subir'))
app.use('/api', require('./routes/productosRouter'))
app.use('/api', require('./routes/paymentRouter'))





// Connectando a la base de moongose
const URI = process.env.MONGODB_LOCAL;
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is connect al port', PORT);
})

