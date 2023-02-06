const router = require('express').Router()
const productControl = require('../controller/productControl')


router.route('/products')
    .get(productControl.getProduct)
    .post(productControl.createProduct)

router.route('/products/:id')
    .delete(productControl.deleteProduct)
    .put(productControl.updateProduct)


module.exports = router