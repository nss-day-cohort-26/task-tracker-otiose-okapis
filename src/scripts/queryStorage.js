//function to retreive data from local storage

const getDatabase = (databaseName) => {
    const localContactDB = localStorage.getItem(databaseName)
    if (localContactDB === null) {
        const contactsDB = []
        return contactsDB
    }
    else {

        let existingDB = localStorage.getItem(databaseName)
        existingDB = JSON.parse(existingDB)
        return existingDB
    }
}

module.exports = getDatabase