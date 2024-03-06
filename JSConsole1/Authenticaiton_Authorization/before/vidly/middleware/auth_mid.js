const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req,res,next) {

    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send('no token was provided')

    try {
        const decode = jwt.verify(token, config.get('jwtPrivateKey'))
       
        req.user = decode
        next()
    } catch (ex) {

        console.log(ex.message)
        res.status(400).send('Invalid token')
        return
    }

    


}

module.exports.auth = auth