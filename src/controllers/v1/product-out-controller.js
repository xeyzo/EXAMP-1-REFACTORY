const response = require('../../helpers/response')
const { ProductOut, Product, User } = require('../../database/models')
const paginateData = require('../../helpers/paginate-data')

class ProductOutController {
    static async getAll (req, res) {
        try {
            const paginate = paginateData({
                limit: req.query.limit,
                page: req.query.page,
                total: await Product.count()
            })
            const productOuts = await ProductOut.findAll({
                offset: paginate.page,
                limit: paginate.limit,
                include: [
                    { model: Product, as: 'product'/*, include: [ { model: User, as: 'supplier' } ]*/ }
                ]
            })
            res.status(200).json(response('success', 'product-out fetched', { data: productOuts, ...paginate.data }))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async create (req, res) {
        try {
            const productOut = await ProductOut.create({ ...req.body.data })
            const product = await Product.findByPk(productOut.productId)
            product.stock -= productOut.total
            await product.save()
            res.status(201).json(response('success', 'product-out created', productOut))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async update (req, res) {
        try {
            const { date, total, productId } = req.body.data
            const productOut = await ProductOut.findByPk(req.params.id)
            if (!productOut) return res.status(404).json(response('fail', 'data not found'))
            
            const product = await Product.findByPk(productOut.productId)
            if (productId == productOut.productId) {
                if ((product.stock + productOut.total) - total > 0) {
                    product.stock -= total
                } else {
                    return res.status(400).json(response('fail', 'please check product stock'))
                }
            } else {
                const product = await Product.findByPk(productId)
                if (product.stock - total > 0) {
                    product.stock -= total
                } else {
                    return res.status(400).json(response('fail', 'please check product stock'))
                }
            }

            await product.save()
            productOut.date = date
            productOut.total = total
            productOut.productId = productId
            await productOut.save()
            res.status(200).json(response('success', 'data updated', productOut))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async destroy (req, res) {
        const { id } = req.params

        const productOut = await ProductOut.findByPk(id)
        if (!productOut) return res.status(404).json(response('fail', 'data not found'))

        await productOut.destroy()
        res.status(200).json(response('success', 'data deleted'))
    }

    static async getById (req, res) {
        try {
            const productOut = await ProductOut.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    { model: Product, as: 'product', include: [ { model: User, as: 'supplier' } ] }
                ]
            })
            if (!productOut) return res.status(404).json(response('fail', 'data not found'))
    
            res.status(200).json(response('success', 'get data by id', productOut))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ProductOutController
