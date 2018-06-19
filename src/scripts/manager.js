const Task = require("./task");
const Load = require("./queryStorage");
const Save = require("./setStorage");
const Drag = require("./dragNDrop")
console.log(Save);


const manager = {
    database: {
        categories: [],
    },

    placeTask: function(card){
        console.log(`.${card.location}`)
        const column = document.querySelector(`.${card.location}`);
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("draggable", true)
        cardDiv.setAttribute("id", card.name + card.describe);
        const nameText = document.createElement("h3")
        nameText.textContent = card.name;
        cardDiv.appendChild(nameText);
        const catText = document.createElement("h4");
        catText.textContent = card.category;
        cardDiv.appendChild(catText);
        cardDiv.appendChild(document.createElement("br"))
        const descText = document.createElement("p");
        descText.textContent = card.describe;
        cardDiv.appendChild(descText);
        cardDiv.appendChild(document.createElement("br"))
        const dueText = document.createElement("span");
        dueText.textContent = card.due;
        cardDiv.appendChild(dueText);
        cardDiv.classList.add("task-card");
        column.appendChild(cardDiv);
        Drag.init();
    },

    createTask: function (taskName, description, dueDate, category = "") {
        const card = new Task(taskName, description, dueDate, category);



        /////////    Set Dom Card Element
        this.placeTask(card);




        /////// SAVE

        this.database[taskName] = card;
        ///// Set Timeout
        console.log(dueDate);

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
        // const localContactDB = localStorage.getItem("localStorageDB")
        // console.log("null or nay", localStorage.getItem("localStorageDB") )
        // if (localContactDB === null) {
        //     const localStorageDB = {}
        //     return localStorageDB
        // }
        // else {
            let existingDB = localStorage.getItem("localStorageDB")
            existingDB = JSON.parse(existingDB)
            manager.database = existingDB
            console.log(existingDB)
        // }
    },

    save: function(){
            let theDatabase = manager.database
            const dataString = JSON.stringify(theDatabase)
            localStorage.setItem("localStorageDB", dataString)
        }
};
Object.defineProperty(manager.database, "categories", {
    enumerable: false
});

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

