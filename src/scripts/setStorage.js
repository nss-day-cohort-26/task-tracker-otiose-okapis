const Saver = {

    saveDatabase: (localStorageKey, databaseObject) => {
        console.log("in setStorage", databaseObject);
        const dataString = JSON.stringify(databaseObject)
        console.log("datastring", dataString);
        localStorage.setItem(localStorageKey, dataString)
    }
}

module.exports = Saver;