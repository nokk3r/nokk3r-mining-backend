const express = require('express')
const cors = require('cors')
const {PORT} = require('./settings/env')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/', require('./routes/api.router.js'))

app.listen(PORT, () => {
    console.log(`URL: http://localhost:${PORT}`)
})