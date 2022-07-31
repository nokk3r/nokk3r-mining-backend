const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./../settings/env")
const Response = require('../helpers/responseHelper')


exports.index = (req, res) => {
    return Response.ok(res, 'API WORKS!')
}

exports.token = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return Response.forbidden(res, 'Токен не найдет')
        }
        jwt.verify(token, JWT_SECRET)
        return Response.ok(res, 'Токен валидный')
    } catch (e) {
        return Response.badRequest(res, 'Токен не валидный')
    }
}