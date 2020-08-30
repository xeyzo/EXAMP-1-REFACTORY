const { In, ProductOut, Product } = require('../../database/models')
const reportQueue = require('../../queue/report')
const response = require('../../helpers/response')

class ReportController {
    static async print (req, res) {
        const { type } = req.params
        if (type.toLowerCase() === 'in') {
            try {
                const productIn = await In.findAll({
                    include: [
                        { model: Product, as: 'product' }
                    ]
                })

                const productData = productIn.map(p => p.dataValues).map(p => { p['product'] = p.product.dataValues; return p})

                reportQueue.add({
                    pdf: productData,
                    user: req.user.email,
                }, {
                    delay: 1000,
                    repeat: {
                        cron: '0 01 0 28-31 * *',
                    }
                })
                res.status(200).json(response('success', 'monthly report sent to ur email'))
            } catch (err) {
                res.status(500).json(response('fail', err.message))
            }
        } else {
            try {
                const productIn = await In.findAll({
                    include: [
                        { model: Product, as: 'product' }
                    ]
                })

                const productData = productIn.map(p => p.dataValues).map(p => { p['product'] = p.product.dataValues; return p})

                reportQueue.add({
                    pdf: productData,
                    user: req.user.email,
                }, {
                    delay: 1000,
                    repeat: {
                        cron: '0 01 0 28-31 * *',
                    }
                })
                res.status(200).json(response('success', 'monthly report sent to ur email'))
            } catch (err) {
                res.status(500).json(response('fail', err.message))   
            }
        }
    }
}

module.exports = ReportController
