const response = require('../../helpers/response')
const { User } = require ('../../database/models/')

class UserController {
    static async create (req, res) {
        try{
            const user = await User.create({ ...req.body.data })
            res.status(200).json(response('success', 'user created', user))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }        
    }

    static async read (req, res){
        try{
            const user = await User.findAll({ attributes: ["username", "email", "full_name","phone_number"],
            })
            res.status(200).json(response('success', 'get all data user', user))
        }catch(err){
            res.status(500).json(response('fail', err.message))
        }
    }

    static async find (req, res){
        const { id } = req.params;
        try{
            const userdetail = await models.User.findByPk(id);
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
