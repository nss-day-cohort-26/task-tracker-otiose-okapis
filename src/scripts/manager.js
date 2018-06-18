const Task = require("./task");


const manager = {
    database: {
        categories: [],
    },

    createTask: function (taskName, description, dueDate, category = "") {
        const card = new Task(taskName, description, dueDate, category);
        this.database[taskName] = card;
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
    }
};

manager.createTask("test", "testing", "someday", "none");
console.log(manager.database);