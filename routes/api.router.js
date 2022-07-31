const {Router} = require('express')
const indexRoutes = require('./index.routes')
const authRoutes = require('./auth.routes')

const router = Router()

router.use(indexRoutes)
router.use(authRoutes)

module.exports = router