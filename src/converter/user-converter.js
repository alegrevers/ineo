class UserConverter {
    toDto (databaseData) {
        return databaseData
        // const { _id,
        //     maker,
        //     year,
        //     color,
        //     doors,
        //     model,
        //     driveType,
        //     induction,
        //     transmission,
        //     engineCylinders,
        //     engineDisplacement,
        //     transmissionSpeeds } = databaseData

        // return {
        //     id: _id,
        //     maker: maker,
        //     year: year,
        //     color: color,
        //     doors: doors,
        //     model: model,
        //     driveType: driveType,
        //     induction: induction,
        //     transmission: transmission,
        //     engineCylinders: engineCylinders,
        //     engineDisplacement: engineDisplacement,
        //     transmissionSpeeds: transmissionSpeeds,
        // }
    }
}

module.exports = UserConverter