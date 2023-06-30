const { validationResult } = require('express-validator'); //TODO:

const validateResult = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(403)
        res.send({ errors: errors.array() })
    } else {
        next()
    }
}

module.exports = { validateResult }