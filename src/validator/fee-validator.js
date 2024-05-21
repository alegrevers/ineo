const FeeNotFoundError = require("../errors/fee-not-found-error")
const UserMissingError = require("../errors/user-missing-error")
const Fee = require("../models/fee-model")

class FeeValidator {
    validateInsert (insertData) {
        const { user_id } = insertData

        if (!user_id) throw new UserMissingError()
    }

    async validateId (id) {
        const protest = await Fee.findByPk(id)
        if (!protest) throw new FeeNotFoundError()
    }

}

module.exports = FeeValidator