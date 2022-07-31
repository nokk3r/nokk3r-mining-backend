const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./../settings/env')


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({errors: [{msg: "Токен недействителен"}]})
        }
        res.locals.user = jwt.verify(token, JWT_SECRET)
        next()
    } catch (e) {
        return res.status(403).json({errors: [{msg: "Нужно авторизоваться"}]})
    }
};