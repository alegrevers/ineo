const { DataTypes } = require('sequelize')
const database = require("../utils/database-utils");
const User = require('./user-model');
const Protest = require('./protest-model');

const Fee = database.define('fees', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    protest_id: {
        type: DataTypes.UUID,
        references: {
            model: Protest,
            key: 'id',
        },
        allowNull: true,
    },
    protest_fee: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
})

Fee.hasOne(Protest)
Protest.belongsTo(Fee, {
    foreignKey: 'id'
})

module.exports = Fee