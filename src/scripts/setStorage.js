
const manager = require("./manager")

const saveDatabase = (localStorageKey) => {
    let theDatabase = manager.database
    const dataString = JSON.stringify(theDatabase)
    localStorage.setItem(localStorageKey, dataString)
}

module.exports = Saver;