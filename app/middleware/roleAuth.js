
const { verifyToken } = require('../helpers/generateToken')
const userModel = require('../models/users')

const checkRoleAuth = (...roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        const userData = await userModel.findById(tokenData._id)
        console.log(userData)
        if (roles.includes(userData.role)) {
            console.log('Tiene permiso')
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }
}

module.exports = checkRoleAuth

