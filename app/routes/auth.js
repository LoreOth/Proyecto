const express=require("express")
const router = express.Router()

const {login, registerCtrl} = require('../controllers/auth')

//TODO: Donde recibimos data http://localhost:8080/api/users/login
router.post('/login', login)


router.post("/register", registerCtrl)

module.exports=router