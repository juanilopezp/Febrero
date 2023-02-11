const router = require('express').Router()
const userControl = require ('../controller/userControl')
const auth = require('../middleware/auth')

router.post('/register', userControl.register)

router.post('/login', userControl.login)

router.get('/logout', userControl.logout)

router.get('/refresh_token', userControl.register)

router.get('/infor', auth, userControl.getUser)

module.exports = router