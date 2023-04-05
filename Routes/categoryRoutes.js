const router = require('express').Router()
const categoryControl = require ('../controller/categoryControl')
const auth = require('../middleware/auth')



router.route('/category')
    .get(categoryControl.getCategories)
    .post(auth, categoryControl.createCategory)

router.route('/category/:id')
    .delete(auth, categoryControl.deleteCategory)
    .put(auth, categoryControl.updateCategory)
module.exports = router