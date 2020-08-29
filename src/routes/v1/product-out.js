const router = require('express').Router()
const ProductOutController = require('../../controllers/v1/product-out-controller')

router.get('/', ProductOutController.getAll)

module.exports = router
