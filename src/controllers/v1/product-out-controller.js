const response = require('../../helpers/response')
const { ProductOut, Product } = require('../../database/models')

class ProductOutController {
    static async getAll (req, res) {
        try {
            const productOuts = await ProductOut.findAll({
                include: [
                    { model: Product, as: 'product' }
                ]
            })
            res.status(200).json(response('success', 'product-out fetched', productOuts))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async create (req, res) {

    }

    static async update (req, res) {

    }

    static async destroy (req, res) {

    }

    static async getById (req, res) {

    }
}

module.exports = ProductOutController
