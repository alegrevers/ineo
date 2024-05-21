const FeeNotFoundError = require("../errors/fee-not-found-error")
const UserMissingError = require("../errors/user-missing-error")
const Fee = require("../models/fee-model")

class FeeValidator {
    validateInsert (insertData) {
        const { user } = insertData

        if (!user) throw new UserMissingError()
    }

    async validateId (id) {
        const protest = await Fee.findById(id)
        if (!protest) throw new FeeNotFoundError()
    }

}

module.exports = FeeValidator