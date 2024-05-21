const EmailMissingError = require("../errors/email-missing-error")
const NameMissingError = require("../errors/name-missing-error")
const PasswordMissingError = require("../errors/password-missing-error")
const UserNotFoundError = require("../errors/user-not-found-error")
const User = require("../models/user-model")

class UserValidator {
    validateInsert (insertData) {
        const { name, email, password } = insertData

        if (!name) throw new NameMissingError()
        if (!email) throw new EmailMissingError()
        if (!password) throw new PasswordMissingError()
    }

    async validateId (id) {
        const user = await User.findByPk(id)
        if (!user) throw new UserNotFoundError()
    }

}

module.exports = UserValidator