const response = require('../../helpers/response')
const { Product } = require('../../database/models')

class ProductController {
    static async getAll (req, res) {
        const products = await Product.findAll()
        res.status(200).json(response('success', 'products fetched', products))
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

module.exports = ProductController
