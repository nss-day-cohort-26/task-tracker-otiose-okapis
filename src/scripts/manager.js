const Task = require("./task");
const Load = require("./queryStorage");
const Save = require("./setStorage");
// const Drag = require("./dragNDrop")
// console.log(Save);


const manager = {
    database: {
        categories: ["test1", "test2", "test3"],
    },

    placeTask: function(card){
        console.log(`.${card.location}`)
        const column = document.querySelector(`.${card.location}`);
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("draggable", true)
        cardDiv.setAttribute("id", card.name + card.describe);
        cardDiv.setAttribute("data-name", card.name)
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
        dueText.textContent = new Date(card.due);
        cardDiv.appendChild(dueText);
        cardDiv.classList.add("task-card");
        column.appendChild(cardDiv);
        DragDropManager.init();
    },

    createTask: function (taskName, description, dueDate, category = "") {
        const card = new Task(taskName, description, dueDate, category);



        /////////    Set Dom Card Element
        this.placeTask(card);




        /////// SAVE

        this.database[taskName] = card;

        ///// Set Timeout
        // console.log(dueDate);

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

        const localContactDB = localStorage.getItem("localStorageDB")
        console.log("null or nay", localStorage.getItem("localStorageDB") )
        if (localContactDB === null) {
            const localStorageDB = {
                categories: ["test1", "test2", "test3"],
            }
            return localStorageDB
        }
        else {
            let existingDB = localStorage.getItem("localStorageDB")
            existingDB = JSON.parse(existingDB)
            manager.database = existingDB
            console.log(existingDB)
        }
    },

    save: function(){
            const toDoDiv = document.getElementById("to-do").childNodes
            const doingDiv = document.getElementById("doing").childNodes
            const doneDiv = document.getElementById("done").childNodes
            let divArray = [toDoDiv, doingDiv, doneDiv]
            for (let div in divArray){
                let cardDiv = document.getElementsByClassName("task-card")
                console.log(cardDiv)

            }
            let theDatabase = manager.database
            const dataString = JSON.stringify(theDatabase)
            localStorage.setItem("localStorageDB", dataString)
        }
};
Object.defineProperty(manager.database, "categories", {
    enumerable: false
});

/////////////-------------------------------------------------------Drag N Drop Manager-----------------------------///////////////////

const DragDropManager = Object.create(null, {
    init: {
        value: () => {
            const stages = document.querySelectorAll(".task-card");
            let whichCard = ""
            console.log(stages)
            stages.forEach(stage => {
                // Gain reference of item being dragged
                stage.ondragstart = e => {
                    e.dataTransfer.setData("text", e.target.id)
                    console.log(e.target.dataset.name)
                    whichCard = e.target.dataset.name

                }
            })




            const targets = document.querySelectorAll(".target")
            // console.log(targets)

            targets.forEach(target => {
                // Dragover not supported by default. Turn that off.
                target.ondragover = e => e.preventDefault()

                target.ondrop = e => {
                    // Enabled dropping on targets
                    e.preventDefault()

                    // Determine what's being dropped
                    const data = e.dataTransfer.getData("text");
                    // console.log(data)
                    // Append card to target component as child
                    let targetDiv = document.getElementById(e.target.id);
                    // console.log("am i a card", e);
                    let todoDiv = document.querySelector(".to-do")
                    if (targetDiv.id === "doing" || targetDiv.id === "done") {
                        targetDiv.appendChild(document.getElementById(data));
                        manager.database[whichCard].location = e.target.id
                        manager.save()
                    } else if (targetDiv.id === "to-do") {
                        notie.alert({ type: "warning", text: "Error: You cannot drag items into To Do" })
                    }
                }
            })
        }
    },
})
module.exports = manager

