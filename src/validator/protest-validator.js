const DebtMissingError = require("../errors/debt-missing-error")
const DescriptionMissingError = require("../errors/description-missing-error")
const ProtestNotFoundError = require("../errors/protest-not-found-error")
const UserMissingError = require("../errors/user-missing-error")
const Protest = require("../models/protest-model")

class ProtestValidator {
    validateInsert (insertData) {
        const { user_id, description, debt } = insertData

        if (!debt) throw new DebtMissingError()
        if (!user_id) throw new UserMissingError()
        if (!description) throw new DescriptionMissingError()
    }

    async validateId (id) {
        const protest = await Protest.findById(id)
        if (!protest) throw new ProtestNotFoundError()
    }

}

module.exports = ProtestValidator