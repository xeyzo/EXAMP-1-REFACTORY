const router = require('express').Router()
const ProductController = require('../../controllers/v1/product-controller')

router.get('/', ProductController.getAll)
    .post('/', ProductController.create)

router.put('/:id', ProductController.update)
    .delete('/:id', ProductController.destroy)
    .get('/:id', ProductController.getById)

module.exports = router
