const ProtestValidator = require("../validator/protest-validator")
const Protest = require('../models/protest-model')
const Fee = require("../models/fee-model")
const validator = new ProtestValidator()
const DEBT_THRESHOLDS = {
    LOW: 1000,
    MID: 5000
};

const DEBT_RATES = {
    LOW: 0.05,
    MID: 0.075,
    HIGH: 0.10
};


class ProtestHandler {
    async findAll(req, res) {
        try {
            const protests = await Protest.findAll()

            res.send(protests)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async findById (req, res, next) {
        try {
            const filter = req.params.id
            await validator.validateId(filter)
            const protest = await Protest.findByPk(filter)

            res.json(protest)
        } catch (error) {
            next(error)
        }
    }

    async buildFeeInsertObject (protestData) {
        let protestFee

        if (protestData.debt < DEBT_THRESHOLDS.LOW) {
            protestFee = protestData.debt * DEBT_RATES.LOW;
        } else if (protestData.debt < DEBT_THRESHOLDS.MID) {
            protestFee = protestData.debt * DEBT_RATES.MID;
        } else {
            protestFee = protestData.debt * DEBT_RATES.HIGH;
        }

        return {
            user_id: protestData.user_id,
            protest_id: protestData.id,
            protest_fee: protestFee,
        }
    }

    async insert (req, res,next) {
        try {
            const insertData = req.body
            validator.validateInsert(insertData)

            const insertedProtest = await Protest.create(insertData)

            const feeInsertData = await this.buildFeeInsertObject(insertedProtest.dataValues)
            await Fee.create(feeInsertData)

            res.json(insertedProtest.dataValues)
        } catch (error) {
            next(error)
        }
    }

    async update (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const updatedProtest = await Protest.update(req.body, { where: { id: req.params.id } })

            res.json(updatedProtest)
        } catch (error) {
            next(error)
        }
    }

    async delete (req, res, next) {
        try {
            await validator.validateId(req.params.id)

            const deletedProtest = await Protest.destroy({ where: { id: req.params.id } })

            res.json(deletedProtest)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProtestHandler