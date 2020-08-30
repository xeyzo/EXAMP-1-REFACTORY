const response = require('../../helpers/response')
const { Product, User } = require('../../database/models')
const paginateData = require('../../helpers/paginate-data')

class ProductController {
    static async getAll (req, res) {
        try {
            const paginate = paginateData({
                limit: req.query.limit,
                page: req.query.page,
                total: await Product.count()
            })
            const products = await Product.findAll({
                offset: paginate.page,
                limit: paginate.limit,
                include: [
                    { model: User, as: 'supplier' }
                ]
            })
            res.status(200).json(response('success', 'products fetched', { data: products, ...paginate.data }))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async create (req, res) {
        try {
            const product = await Product.create({ ...req.body.data })
            res.status(201).json(response('success', 'product created', product))
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
                },
                include: [
                    { model: User, as: 'supplier' }
                ]
            })
            if (!product) return res.status(404).json(response('fail', 'product not found'))

            res.status(200).json(response('success', 'get product by id', product))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ProductController
