const router = require('express').Router()
const ProductController = require('../../controllers/v1/product-controller')

router.get('/', ProductController.getAll)

module.exports = router
