const sequelize = require('../DB/db_connection')
const User = require('./user')

const db = {
    sequelize,
    User
}

module.exports = db;