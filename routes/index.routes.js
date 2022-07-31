const indexController = require("./../controller/indexController");
const {Router} = require("express");


const router = Router()

router.get('/', indexController.index)

router.get('/token', indexController.token)


module.exports = router