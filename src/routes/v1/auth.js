const router = require('express').Router()
const AuthController = require('../../controllers/v1/auth-controller')

router.post('/login', AuthController.login)
router.post('/signup', AuthController.signup)
router.get('/current-user', AuthController.currentUser)

module.exports = router
