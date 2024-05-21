const User = require('../models/user-model')
const UserConverter = require("../converter/user-converter")
const UserValidator = require("../validator/user-validator")
const UserNotFoundError = require('../errors/user-not-found-error')
const InvalidPasswordError = require('../errors/invalid-password-error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const converter = new UserConverter()
const validator = new UserValidator()

class UserHandler {
    async login (req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email: email } })
        if (!user) throw new UserNotFoundError()

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) throw new InvalidPasswordError()

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        })

        res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        })
    }

    async findAll(req, res) {
        try {
            const users = await User.findAll()

            res.send(users.map(user => converter.toDto(user)))
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById (req, res, next) {
        try {
            const filter = req.params.id
            await validator.validateId(filter)
            const user = await User.findByPk(filter)

            res.json(converter.toDto(user))
        } catch (error) {
            next(error)
        }
    }


    async insert (req, res,next) {
        try {
            const insertData = req.body
            await validator.validateInsert(insertData)

            const insertedUser = await User.create(insertData)

            res.json(converter.toDto(insertedUser))
        } catch (error) {
            next(error)
        }
    }

    async update (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const updatedUser = await User.update(req.body, { where: { id: req.params.id } })

            res.json(converter.toDto(updatedUser))
        } catch (error) {
            next(error)
        }
    }

    async delete (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const deletedUser = await User.destroy({ where: { id: req.params.id } })

            res.json(converter.toDto(deletedUser))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserHandler