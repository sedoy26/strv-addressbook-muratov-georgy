const router = require('express').Router()
const { UserModel } = require('../db/userModel')
const { JWT } = require('../utils/jwt') 
const {UserController: {signup, login, addContact}} = require('../controllers/user')
const {Validator} = require('../utils/validator')

router.put('/signup',Validator.signup, async (req, res, next) => {
    let response = await signup(req.body.email, req.body.password)
    res.status(response.status).send(response)
})

router.put('/login', Validator.login, async (req, res, next) => {
    let response = await login(req.body.email, req.body.password)
    res.status(response.status).send(response)
})

router.put('/addContact', JWT.auth, Validator.addContact, (req, res, next) => {
    let response = addContact(req.body.email, req.userEmail, req.body.phone, req.body.name)    
    res.status(response.status).send(response)
})

module.exports.user = router