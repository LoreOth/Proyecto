
const login = require('../controllers/auth')
const express = require("express")
const router = express.Router()

//TODO: Donde recibimos data http://localhost:8080/api/auth/login
router.post('/login', login)


module.exports = router