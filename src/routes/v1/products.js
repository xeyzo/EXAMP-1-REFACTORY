const router = require('express').Router()
const ProductController = require('../../controllers/v1/product-controller')
const cloudinary = require('../../middleware/cloudinary')

router.get('/', ProductController.getAll)
    .post('/', cloudinary.single('photo'), ProductController.create)

router.put('/:id', cloudinary.single('photo'), ProductController.update)
    .delete('/:id', ProductController.destroy)
    .get('/:id', ProductController.getById)

module.exports = router
