const router = require('express').Router()
const productoCtrl = require('../controllers/productosController')

router.route('/productos')
    .get(productoCtrl.getProducts)
    .post(productoCtrl.createProducts)

router.route('/producto/:id')
    .delete(productoCtrl.deleteProducts)
    .put(productoCtrl.updateProducts)


module.exports = router