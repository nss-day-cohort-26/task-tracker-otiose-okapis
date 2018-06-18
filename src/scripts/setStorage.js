const saveDatabase = (localStorageKey, databaseObject) => {
    const dataString = JSON.stringify(databaseObject)
    localStorage.setItem(localStorageKey, dataString)
}

module.exports = saveDatabase