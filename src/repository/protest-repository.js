const { DataTypes } = require('sequelize')
const User = require('../repository/user-repository')
const Fee = require('../repository/fee-repository')
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
    user: {
        type: DataTypes.UUID,
        references: User,
        key: 'id'
    },
    fee: {
        type: DataTypes.UUID,
        references: Fee,
        key: 'id',
        allowNull: true,
    }
})

// Protest.belongsToMany(User)
Protest.hasOne(Fee, {
    foreignKey: 'id',
})
Fee.belongsTo(Protest)

module.exports = Protest