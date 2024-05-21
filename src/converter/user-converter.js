class UserConverter {
    toDto (databaseData) {
        return {
            id: databaseData.id,
            name: databaseData.name,
            email: databaseData.email,
        }
    }
}

module.exports = UserConverter