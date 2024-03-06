const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function (req,res,next) {

    const token = req.header('x-auth-token')

    if (!token) res.status(401).send('Invalid token')

    try {

        decoded = jwt.verify(token, config.get('jwtPrivateKey'))

        req.user = decoded

        if (!req.user.isAdmin) return res.status(403).send('Forbidden')
        next()

    } catch (ex) {

        res.status(400).send('Invalid token')
        return

    }

}