const {Router} = require("express");
const {check} = require("express-validator");
const authController = require("../controller/authController");


const router = Router()

router.post('/register', [
    check('login', 'login обязателен')
        .notEmpty(),
    check('password', 'Password обязателен')
        .notEmpty()
        .isLength({min: 4})
        .withMessage('Минимальная длина пароля: 4')
], authController.register)


router.post('/login', [
    check('login', 'login обязателен')
        .notEmpty(),
    check('password', 'Password обязателен')
        .notEmpty()
        .isLength({min: 4})
        .withMessage('Минимальная длина пароля: 4'),
], authController.login)


module.exports = router