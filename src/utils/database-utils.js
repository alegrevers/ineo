require('dotenv').config()
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT,
        storage: ':memory:'
    })

module.exports = sequelize
