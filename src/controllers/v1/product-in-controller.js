const response = require('../../helpers/response')
const paginateData = require('../../helpers/paginate-data')
const { In, Product } = require('../../database/models')

class ProductInController {   
    static async create (req, res) {
        try{
            const productIn = await In.create({ ...req.body.data })
            res.status(201).json(response('success', 'product in succes', productIn))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }        
    }

    static async read (req, res) {
        try {
            const paginate = paginateData({
                limit: req.query.limit,
                page: req.query.page,
                total: await In.count()
            })
            const productIn = await In.findAll({
                offset: paginate.page,
                limit: paginate.limit,
                include: [
                    { model: Product, as: 'product' }
                ]
            })
            res.status(200).json(response('success', 'get data product in', { data: productIn, ...paginate.data }))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async find (req, res) {
    try {
        const data = await In.findByPk({
            where: {
                id: req.params.id
            },
            include: [
                { model: Product, as: 'product' }
            ]
        })
        if (!data) throw new Error("Data not found");
            res.status(200).json(response('success', 'get data by id', data));
        } catch (error) {
            res.status(404).json(response('fail', error.message));
        }
    }

    static async update (req, res) {
        const { product_id, date, total } = req.body.data
        try{
            const productIn = await In.findByPk(req.params.id)
            productIn.product_id = product_id
            productIn.date = date
            productIn.total = total
            await productIn.save()
            res.status(200).json(response('success', 'update data done', productIn))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }
    }

    static async delete (req, res) {
        const { id } = req.params
        try {
            const productIn = await In.findByPk(id)
            if (!productIn) return res.status(404).json(response('fail', 'data not found'))
    
            await productIn.destroy()
            res.status(200).json(response('success', 'data deleted')) 
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }   
}

module.exports = ProductInController