const { In, ProductOut, Product } = require('../../database/models')
const reportQueue = require('../../queue/report')
const generatePDF = require('../../services/generate-pdf')
const response = require('../../helpers/response')

class ReportController {
    static async print (req, res) {
        const { type } = req.params
        try {
            const productIn = await In.findAll({
                include: [
                    { model: Product, as: 'product' }
                ]
            })
             
            const productOut = await ProductOut.findAll({
                include: [
                    { model: Product, as: 'product' }
                ]
            })
            if (type === 'in') {
                reportQueue.add({
                    pdf: productIn.map(p => p.dataValues).map(p => { p['product'] = p.product.dataValues; return p}),
                    user: req.user.dataValues.email,
                }, {
                    delay: 1000,
                    repeat: {
                        cron: '0 01 0 28-31 * *',
                    }
                })
            } else if (type === 'out') {
                reportQueue.add({
                    pdf: productOut.map(p => p.dataValues).map(p => { p['product'] = p.product.dataValues; return p}),
                    user: req.user.dataValues.email,
                }, {
                    delay: 1000,
                    repeat: {
                        cron: '0 01 0 28-31 * *',
                    }
                })
            }
            res.status(200).json(response('success', 'monthly report sent to ur email'))

        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ReportController
