const router = require('express').Router()
const ProductOutController = require('../../controllers/v1/product-out-controller')

router.get('/', ProductOutController.getAll)
    .post('/', ProductOutController.create)

router.put('/:id', ProductOutController.update)
    .delete('/:id', ProductOutController.destroy)
    .get('/:id', ProductOutController.getById)

module.exports = router
