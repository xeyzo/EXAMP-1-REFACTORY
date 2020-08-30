require('dotenv').config()
const response = require('../../helpers/response')
const bcrypt = require('bcrypt')
const { User, Product } = require('../../database/models/')
const jwt = require('jsonwebtoken')

class AuthController {
    static async signup (req, res) {
        try {
            req.body.data.password = await bcrypt.hash(req.body.data.password, 10)
            const user = await User.create({ ...req.body.data })
            res.status(201).json(response('success', 'signup success', user))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async login (req, res) {
        const { username, password } = req.body.data
        try {
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!user) return res.status(400).json(response('fail', 'username not found'))

            const compare = await bcrypt.compare(password, user.password)
            if (!compare) return res.status(400).json(response('fail', 'wrong password'))

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.status(200).json(response('success', 'login', { token }))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async currentUser (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.user.id
                },
                // include: [
                //     { model: Product, as: 'products' }
                // ]
            })

            res.status(200).json(response('success', 'current user', user))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = AuthController
