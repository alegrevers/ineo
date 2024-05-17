const { DataTypes } = require('sequelize')
const database = require("../utils/database-utils");

const Protest = database.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // protest: [{

    //     debt: {
    //         type: DataTypes.DOUBLE,
    //     },
    //     description: {
    //         type: DataTypes.STRING,
    //     }
    // }],
    // fee: [{
    //     amount: {
    //         type: DataTypes.DOUBLE,
    //     },
    //     description: {
    //         type: DataTypes.STRING,
    //     }
    // }]
})

module.exports = Protest