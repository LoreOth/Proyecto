const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/users')

//TODO: Login!
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await userModel.findOne({ email, password }) 
        if (existingUser) {
            const token = await tokenSign(existingUser);
            console.log('Identidad validada' + existingUser)
            return res.send({ data: existingUser, token }) // Enviar respuesta exitosa y detener la ejecución
        }
        return res.status(400).send({ error: 'Identidad no válida' }) // Enviar respuesta de error y detener la ejecución
    } catch (e) {
        httpError(res, e)
    }
}


//TODO: Registramos usuario!
const registerCtrl = async (req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const { email, password, name } = req.body

        const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!
        const registerUser = await userModel.create({
            email,
            name,
            password: passwordHash
        })

        res.send({ data: registerUser })

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { login, registerCtrl }