const Task = require("./task");
const setStorage = require("./setStorage")


const manager = {
    database: {
        categories: [],
    },

    createTask: function (taskName, description, dueDate, category = "") {
        const card = new Task(taskName, description, dueDate, category);
        return this.database[taskName] = card;
    },
    createNewCategory: function (category) {
        let exists = false;
        this.database.categories.forEach(element => {
            if (element === category) {
                exists = true;
            }
        });
        if (exists === false) {
            this.database.categories.push(category);
        }
        else {
            alert("There is a problem");
        }
    },
    setStorage: () => {setStorage("localDB",manager.database)}
};

// manager.createTask("test", "testing", "someday", "none");
// manager.createTask("test2", "testing3", "someday4", "none");
// manager.setStorage()
// console.log(manager.database);

module.exports = manager