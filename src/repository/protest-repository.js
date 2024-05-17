const { DataTypes } = require('sequelize')
const User = require('../repository/user-repository')
const database = require("../utils/database-utils");

const Protest = database.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    debt: {
        type: DataTypes.DOUBLE,
    },
    description: {
        type: DataTypes.STRING,
    },
    user: {
        references: User,
        key: 'id'
    },
    fee: [{
        amount: {
            type: DataTypes.DOUBLE,
        },
        description: {
            type: DataTypes.STRING,
        }
    }]
})

module.exports = Protest