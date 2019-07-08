const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization

    const [, token] = authorization.split(' ')
    if(!token) {
        return res.status(400).json({ error: 'Token not provided' })
    }

    try {
        const decoded = await promisify(jwt.verify)(token, 'NodeJS')    
        req.userId = decoded.id

        return next()
    } catch (error) {
        return res.status(400).json({ error: 'Token inválido!' })
    }

}