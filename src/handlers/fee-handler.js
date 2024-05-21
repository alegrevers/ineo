const FeeValidator = require("../validator/fee-validator")
const Fee = require('../models/fee-model')
const validator = new FeeValidator()

class FeeHandler {
    async findAll(req, res) {
        try {
            const fee = await Fee.findAll()

            res.send(fee)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById (req, res, next) {
        try {
            const filter = req.params.id
            await validator.validateId(filter)
            const fee = await Fee.findByPk(filter)

            res.json(fee)
        } catch (error) {
            next(error)
        }
    }


    async insert (req, res,next) {
        try {
            const insertData = req.body
            validator.validateInsert(insertData)

            const insertedFee = await Fee.create(insertData)

            res.json(insertedFee)
        } catch (error) {
            next(error)
        }
    }

    async update (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const updatedFee = await Fee.update(req.body, { where: { id: req.params.id } })

            res.json(updatedFee)
        } catch (error) {
            next(error)
        }
    }

    async delete (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const deletedFee = await Fee.destroy({ where: { id: req.params.id } })

            res.json(deletedFee)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = FeeHandler