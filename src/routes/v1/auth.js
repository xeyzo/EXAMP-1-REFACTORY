const router = require('express').Router()
const authToken = require('../../middleware/auth-token')
const AuthController = require('../../controllers/v1/auth-controller')

router.post('/login', AuthController.login)
router.post('/signup', AuthController.signup)
router.get('/current-user', authToken, AuthController.currentUser)

module.exports = router
