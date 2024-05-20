const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');
const Protest = require('../repository/protest-repository')
const Fee = require('../repository/fee-repository')
const database = require("../utils/database-utils");

const User = database.define('users', {
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
    }
    // ,
    // protest: {
    //     references: Protests,
    //     key: 'id',
    //     allowNull: true,
    // },
    // fee: {
    //     references: Fees,
    //     key: 'id',
    //     allowNull: true,
    // }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate:async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },
    instanceMethods: {
        validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
        }
    }
})

User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
}

// User.hasMany(Protest, {
//     foreignKey: 'id',
// })
// Protest.belongsTo(User);
// User.hasMany(Fee, {
//     foreignKey: 'id',
// })
// Fee.belongsTo(User);

module.exports = User