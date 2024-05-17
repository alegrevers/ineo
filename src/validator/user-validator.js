// const ColorMissingError = require('../errors/color-missing-error')
// const IdNotFoundError = require('../errors/id-not-found-error')
// const InvalidIdError = require('../errors/invalid-id-error')
// const MakerMissingError = require('../errors/maker-missing-error')
// const ModelMissingError = require('../errors/model-missing-error')
// const YearMissingError = require('../errors/year-missing-error')
// const Vehicle = require('../repository/vehicle-repository')

class UserValidator {
    validateInsert (insertData) {
        // const { maker, year, color, model } = insertData

        // if (!year) throw new YearMissingError()
        // if (!color) throw new ColorMissingError()
        // if (!maker) throw new MakerMissingError()
        // if (!model) throw new ModelMissingError()
    }

    async validateId (id) {
        // if (id && !ObjectId.isValid(id)) throw new InvalidIdError()

        // const car = await Vehicle.findById(id)
        // if (!car) throw new IdNotFoundError()
    }

}

module.exports = UserValidator