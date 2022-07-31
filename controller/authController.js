const {validationResult} = require("express-validator");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./../settings/env");
const Response = require("../helpers/responseHelper")

const User = db.user


const generateToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"})
}


exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return Response.badRequest(res, errors)
    }
    try {
        const {login, password} = req.body

        const hashedPass = await bcrypt.hash(password, 10)

        let values = {
            login: login,
            password: hashedPass
        }

        const user = await User.create(values)

        console.log(user)

        const token = generateToken(user.id)

        return Response.create(res, {msg: `Регистрация прошла успешна`, token: token})
    } catch (e) {
        return Response.internalError(res, e)
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return Response.badRequest(res, errors)
    }

    try {
        const {login, password} = req.body
        let values = {
            login: login
        }
        const agent = await User.findOne({where: values})
        if (!agent) {
            return Response.badRequest(res, 'Пользователь не найден')
        }

        if (!await bcrypt.compare(password, agent.password)) {
            return Response.badRequest(res, 'Не правильнй пароль')
        }
        const token = generateToken(agent.id)

        return Response.ok(res, {msg: `Авторизация прошла успешна`, token: token})
    } catch (e) {
        return Response.internalError(res, e)
    }
}