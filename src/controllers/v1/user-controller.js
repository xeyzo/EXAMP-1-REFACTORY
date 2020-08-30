const response = require('../../helpers/response')
const { User } = require ('../../database/models/')
const bcrypt = require("bcrypt")
const paginateData = require('../../helpers/paginate-data')

class UserController {
    static async create(req, res) {
        try {
        const data =  await User.findOne({ where: { username: req.body.username } })
        if (data == null) {
        const hash = bcrypt.hashSync(req.body.password, 10)
        const salt = bcrypt.hashSync(req.body.salt, 10)
        const user = await User.create({ 
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
            phone_number: req.body.phone_number,
            salt: salt,
            password: hash,
            role: req.body.role
            })
            res.status(201).json(response('success', 'new user created',  user.dataValues.username))
        }else{
            throw new Error("Username has been taken")
        }
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }


    static async read (req, res){
        try{
            const paginate = paginateData({
                limit: req.query.limit,
                page: req.query.page,
                total: await Product.count()
            })
            const user = await User.findall({ 
                attributes: ["username", "email", "full_name","phone_number"],
                limit: paginate.limit,
                offset: paginate.page,
            })
            res.status(200).json(response('success', 'get all data user', { data: user, ...paginate.data }))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }
    }

    static async find (req, res){
        const { id } = req.params;
        try{
            const userdetail = await User.findByPk(id);
            if(!userdetail) throw new Error("User not found");
            res.status(200).json(response('success', 'get all data user', userdetail))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }
    }

    static async update (req, res){
        const { full_name, username, email, phone_number } = req.body.data
        try{
            const user = await User.findByPk(req.params.id)
            user.full_name = full_name
            user.username = username
            user.email = email
            user.phone_number = phone_number
            await user.save()
            res.status(200).json(response('success', 'update data done', user))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }
    }

    static async delete(req,res){
        try {
            if (req.params.id != req.userId) {
                return res.status(401).json("You are not the user")
            }
            const data = await User.findByPk(req.userId)
            await User.destroy({
                where: {
                    id: req.user.id,
                }   
            })
            res.status(200).json(response('success', `${data.dataValues.username} is successfully deleted`))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }
    }

}

module.exports = UserController
