// const { Pool } = require('pg')

// const pool = new Pool({
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT,
//     database: process.env.DATABASE_NAME
// })

// module.exports = { query: (text, params) => pool.query(text, params) }
require('dotenv').config()
const { Sequelize } = require('sequelize')
console.log('🚀 ~ process.env.DATABASE_NAME:', process.env.DATABASE_NAME)
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres'
    })

module.exports = sequelize
