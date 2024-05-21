const { DataTypes } = require('sequelize')
const User = require('./user-model')
const database = require("../utils/database-utils");

const Protest = database.define('protests', {
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
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        },
    },
})

// Protest.belongsToMany(User, { foreignKey: 'id', as: 'user_id' })

module.exports = Protest