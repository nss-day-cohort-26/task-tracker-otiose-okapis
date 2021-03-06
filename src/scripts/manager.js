const Task = require("./task");
const Load = require("./queryStorage");
const Save = require("./setStorage");
// const Drag = require("./dragNDrop")
// console.log(Save);


const manager = {
    database: {
        categories: ["test1", "test2", "test3"],
    },

    placeTask: function (card) {

        console.log(`.${card.location}`)
        const column = document.querySelector(`.${card.location}`);
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("draggable", true)
        cardDiv.setAttribute("id", card.name + card.describe);
        const name = card.name.split(" ").join("");
        console.log("name test", name);
        cardDiv.setAttribute("data-name", card.name);
        cardDiv.setAttribute("data-name2", name);
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
        cardDiv.appendChild(document.createElement("br"))
        let archiveBtn = document.createElement("button");
        archiveBtn.setAttribute("id", "archiveBtn");
        archiveBtn.textContent = "Archive";
        archiveBtn.style.visibility = "hidden";
        archiveBtn.addEventListener("click", () => { this.archive(event.target.parentNode) })
        cardDiv.appendChild(archiveBtn);
        cardDiv.classList.add("task-card");
        column.appendChild(cardDiv);
        DragDropManager.init();
        const checkNow = Date.now();
        const checkDue = new Date(card.due);
        const lateTime = checkDue - checkNow;
        const saveName = card.name;
        // console.log("card name", card.name)
        if (checkNow < checkDue) {
            setTimeout(() => { timeOutM(card.name) }, lateTime);
        }
    },

    createTask: function (taskName, description, dueDate, category = "") {
        const card = new Task(taskName, description, dueDate, category);
        const checkNow = Date.now();
        const checkDue = new Date(dueDate);


        /////////    Set Dom Card Element
        this.placeTask(card);




        /////// SAVE

        this.database[taskName] = card;

        ///// Set Timeout
        // console.log(dueDate);

    },

    createNewCategory: function (category) {
        let exists = false;
        console.log(this.database.categories);
        this.database.categories.forEach(element => {
            if (element.toUpperCase() === category.toUpperCase()) {
                exists = true;
            }
        });
        if (exists === false) {
            this.database.categories.push(category);
            return true;
        } else {
            notie.alert({ type: "warning", text: "Category Already Exists" });
            return false;
        }
    },

    load: function () {

        const localContactDB = localStorage.getItem("localStorageDB")

        // console.log("null or nay", localStorage.getItem("localStorageDB") )

        if (localContactDB === null) {
            const localStorageDB = {
                categories: ["To-do"]
            }
            manager.database = localStorageDB;
        }
        else {
            let existingDB = localStorage.getItem("localStorageDB")
            existingDB = JSON.parse(existingDB)
            manager.database = existingDB
            // console.log(existingDB)
        }
    },

    save: function () {
        const toDoDiv = document.getElementById("to-do").childNodes
        const doingDiv = document.getElementById("doing").childNodes
        const doneDiv = document.getElementById("done").childNodes
        let divArray = [toDoDiv, doingDiv, doneDiv]
        for (let div in divArray) {
            let cardDiv = document.getElementsByClassName("task-card")
            // console.log(cardDiv)


        }
        let theDatabase = manager.database
        const dataString = JSON.stringify(theDatabase)
        localStorage.setItem("localStorageDB", dataString)
    },
    archive: function (cardName) {
        const theArchive = document.querySelector(".archive")
        manager.database[cardName.dataset.name].location = "archive"
        manager.database[cardName.dataset.name].archive = true
        manager.save();
        theArchive.appendChild(cardName)
    }
};
Object.defineProperty(manager.database, "categories", {
    enumerable: false
});

function timeOutM(taskM) {
    console.log(taskM);
    const taskN = manager.database[`${taskM}`].name;
    const queryN = taskN.split(" ").join("");
    const cardT = document.querySelector(`[data-name2 = ${queryN}]`)
    const overDue = document.createElement("h5");
    overDue.setAttribute("id", "overDue");
    overDue.textContent = "THIS TASK IS OVERDUE"
    cardT.appendChild(overDue);
}

/////////////-------------------------------------------------------Drag N Drop Manager-----------------------------///////////////////

const DragDropManager = Object.create(null, {
    init: {
        value: () => {
            const stages = document.querySelectorAll(".task-card");
            let whichCard = ""
            // console.log(stages)
            stages.forEach(stage => {
                // Gain reference of item being dragged
                stage.ondragstart = e => {
                    e.dataTransfer.setData("text", e.target.id)
                    // console.log(e.target.dataset.name)
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

                    if (e.target.id === "doing" || e.target.id === "done") {
                        let archiveBtn = document.getElementById(data).childNodes
                        archiveBtn[7].style.visibility = "hidden";
                        e.target.appendChild(document.getElementById(data));
                        manager.database[whichCard].location = e.target.id
                        manager.save()
                        if (e.target.id === "done") {
                            let archiveBtn = document.getElementById(data).childNodes
                            archiveBtn[7].style.visibility = "visible";
                        }
                    }
                    if (e.target.parentNode.id === "doing" || e.target.parentNode.id === "done") {
                        let archiveBtn = document.getElementById(data).childNodes
                        archiveBtn[7].style.visibility = "hidden";
                        e.target.parentNode.appendChild(document.getElementById(data));
                        manager.database[whichCard].location = e.target.parentNode.id
                        console.log(whichCard)
                        manager.save()
                        if (e.target.parentNode.id === "done") {
                            let archiveBtn = document.getElementById(data).childNodes
                            archiveBtn[7].style.visibility = "visible";
                        }
                    }
                    else if (e.target.id === "to-do" || e.target.parentNode.id === "to-do") {
                        notie.alert({ type: "warning", text: "Error: You cannot drag items into To Do" })
                    }
                }
            })
        }
    },
})
module.exports = manager