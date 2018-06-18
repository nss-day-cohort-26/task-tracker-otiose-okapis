//function to retreive data from local storage
const getDatabase = () => {
    const localContactDB = localStorage.getItem("contactsDB")
    if (localContactDB === null) {
        const contactsDB = []
        return contactsDB
    }
    else {
        let existingDB = localStorage.getItem("contactsDB")
        existingDB = JSON.parse(existingDB)
        return existingDB
    }
}

module.exports = getDatabase