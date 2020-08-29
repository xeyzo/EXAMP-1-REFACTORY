const response = require('../../helpers/response')
const { ProductOut } = require('../../database/models')

class ProductOutController {
    static async getAll (req, res) {
        const productOuts = await ProductOut.findAll({
            
        })
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
