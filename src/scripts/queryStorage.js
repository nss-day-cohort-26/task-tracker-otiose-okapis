//function to retreive data from local storage
const getDatabase = (dataBaseName) => {
    const localContactDB = localStorage.getItem(dataBaseName)
    if (localContactDB === null) {
        const contactsDB = []
        return contactsDB
    }
    else {
        let existingDB = localStorage.getItem(dataBaseName)
        existingDB = JSON.parse(existingDB)
        return existingDB
    }
}

module.exports = getDatabase