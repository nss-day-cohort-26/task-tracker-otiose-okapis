const Task = require("./task");
const Load = require("./queryStorage");
const Save = require("./setStorage");
console.log(Save);


const manager = {
    database: {
        categories: [],
    },

    createTask: function (taskName, description, dueDate, category = "") {
        const card = new Task(taskName, description, dueDate, category);



        /////////    Set Dom Card Element
        const column = document.querySelector(".to-do");\
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("draggable", true)
        const nameText = document.createElement("h3")
        nameText.textContent = taskName;
        cardDiv.appendChild(nameText);
        const catText = document.createElement("h4");
        catText.textContent = category;
        cardDiv.appendChild(catText);
        cardDiv.appendChild(document.createElement("br"))
        const descText = document.createElement("p");
        descText.textContent = description;
        cardDiv.appendChild(descText);
        cardDiv.appendChild(document.createElement("br"))
        const dueText = document.createElement("span");
        dueText.textContent = dueDate
        cardDiv.appendChild(dueText);
        cardDiv.classList.add("task-card");
        column.appendChild(cardDiv);

        this.database[taskName] = card; // flag for weirdness
        return card;



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

    load: function(){
        this.database = Load("taskDatabase");
    },

    save: function(){
        Save("taskDatabase", this.database);
    }
};

// manager.createTask("test", "testing", "someday", "none");

// console.log(manager.database);
// manager.save();
// manager.createTask("test222", "testing32", "someday32", "none23");
// console.log(manager.database);
// manager.load();
// console.log("final", manager.database);



// manager.createTask("test", "testing", "someday", "none");
// manager.createTask("test2", "testing3", "someday4", "none");
// manager.setStorage()
// console.log(manager.database);

module.exports = manager

