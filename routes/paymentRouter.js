const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentController')
const auth = require('../middleware/auth')
const authAmin = require('../middleware/authAdmin')

router.route('/payment')
    .get(auth, authAmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createpayment)

module.exports = router