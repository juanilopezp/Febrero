const router = require('express').Router()
const paymentControl = require('../controller/paymentControl')
const auth = require ('../middleware/auth')


router.route('/payment')
.get(auth, paymentControl.getPayments)
.post(auth, paymentControl.createPayments)


module.exports = router