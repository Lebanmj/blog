const express =require('express')
const { getAllUsers, registerController, loginController } = require('../controller/userController')


// router object

const router = express.Router()


// get all users 
router.get('/all-users',getAllUsers)

//  create users 
router.post('/register',registerController)

//  login 
router.post('/login',loginController)

module.exports =router 