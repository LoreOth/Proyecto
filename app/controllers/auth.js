const { httpError } = require('../helpers/handleError')
const { compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/users')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            const isPasswordValid = (password === existingUser.password)
            if (isPasswordValid) {
                const token = await tokenSign(existingUser);
                console.log('Identidad validada' + existingUser)
                return res.send({ data: existingUser, token }) // Enviar respuesta exitosa y detener la ejecución
            }
        }
        return res.status(400).send({ error: 'Identidad no válida' }) // Enviar respuesta de error y detener la ejecución
    } catch (e) {
        httpError(res, e)
    }
}



module.exports = login