const response = require('../../helpers/response')
const { Product } = require('../../database/models')

class ProductController {
    static async getAll (req, res) {
        try {
            const products = await Product.findAll()
            res.status(200).json(response('success', 'products fetched', products))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async create (req, res) {
        try {
            const product = await Product.create({ ...req.body.data })
            res.status(200).json(response('success', 'product created', product))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async update (req, res) {
        // req.body.data.userId = 
        const { name, stock, price } = req.body.data
        try {
            const product = await Product.findByPk(req.params.id)
            product.name = name
            product.stock = stock
            product.price = price
            await product.save()
            res.status(200).json(response('success', 'product updated', product))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async destroy (req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            if (!product) return res.status(404).json(response('fail', 'product not found'))

            await Product.destroy({ where: { id: req.params.id } })
            res.status(200).json(response('success', 'product destroyed'))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async getById (req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!product) return res.status(404).json(response('fail', 'product not found'))

            res.status(200).json(response('success', 'get product by id', product))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ProductController
