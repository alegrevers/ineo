const { DataTypes } = require('sequelize')
const database = require("../utils/database-utils");
const User = require('../repository/user-repository')
const Protest = require('../repository/protest-repository')

const Fee = database.define('fees', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    protest: {
        type: DataTypes.UUID,
        references: Protest,
        key: 'id',
        allowNull: false,
    },
    user: {
        type: DataTypes.UUID,
        references: User,
        key: 'id',
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
})

// Fee.belongsToMany(User)
// Fee.hasOne(Protest, {
//     foreignKey: 'id',
// })
// Protest.belongsTo(Fee)

module.exports = Fee