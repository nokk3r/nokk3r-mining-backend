const {Sequelize, DataTypes} = require('sequelize')
const {DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD} = require('./../settings/env')


const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql'
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./../model/user')(sequelize, DataTypes)

db.sequelize.sync({force: false})
    .then(() => {
        console.log('sync database')
    })

module.exports = db