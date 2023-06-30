

/* se crean usuarios y se valida con el secret, no con JWT. 
 se genera un JWT para que ademas de verificar tenga como dato el role*/
const checkOrigin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        
        if (token === process.env.JWT_SECRET) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        next()
    }

}

module.exports = checkOrigin