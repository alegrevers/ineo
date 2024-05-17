const User = require('../repository/user-repository')
const UserConverter = require("../converter/user-converter")
const UserValidator = require("../validator/user-validator")
const converter = new UserConverter()
const validator = new UserValidator()

class UserHandler {
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
            validator.validateInsert(insertData)

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