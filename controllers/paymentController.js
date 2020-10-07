const Payments = require('../models/paymentModel')
const Usuarios = require('../models/userModel')
const Productos = require('../models/productoModel')



const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find()
      res.json(payments)
    } catch (err) {
      return res.status(200).json({msg: err.message})
    }
  },
  createpayment: async (req, res) => {
    try {
      const usuario = await Usuarios.findById(req.usuario.id).select('name email')
      if(!usuario) return res.status(400).json({msg: 'El usuario no se encuentra existente'})

      const {cart, paymentID, address} = req.body
      const {_id, name, email} = usuario

      const newPayment = new Payments({
        user_id: _id, name, email, cart, paymentID, address 
      })
      
      console.log('vamos bien')

      cart.filter(item => {
        return sold(item._id, item.quantity, item.sold)
      })

      await newPayment.save()
      res.json({msg: "Payment Success"})

    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}


const sold = async (id, quantity, oldSold) => {
  await Productos.findOneAndUpdate({_id: id},{
    sold: quantity + oldSold
  })
}


module.exports = paymentCtrl