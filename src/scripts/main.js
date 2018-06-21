const manager = require("./manager");
const viewArchive = require("./viewArchive")
manager.load();
viewArchive();

console.log(manager.database)
function timeOut(taskM){
    const taskN = manager.database[`${taskM}`].name;
    const queryN = taskN.split(" ").join("");
    console.log(queryN);
    const cardT = document.querySelector(`[data-name2 = ${queryN}]`)
    const overDue = document.createElement("h5");
    overDue.setAttribute("id", "overDue");
    overDue.textContent = "THIS TASK IS OVERDUE"
    cardT.appendChild(overDue);
}
for (task in manager.database){
    // console.log(task)
    // console.log(manager.database[`${task}`].location)
    if (manager.database[`${task}`].location){
        manager.placeTask(manager.database[`${task}`]);
        const checkNow = Date.now();
        const checkDue = new Date(manager.database[`${task}`].due);
        const taskN = manager.database[`${task}`].name;
        const queryN = taskN.split(" ").join("");
        console.log("queryN", queryN);
        // const card = $("[data-name2 = " + queryN + "]");
        console.log(manager.database);
        // console.log("cardTest", cardTest[0]);
        const card = document.querySelector(`[data-name2 = ${queryN}]`)
        // console.log("actual card", card);

        if (checkNow >= checkDue){
            timeOut(taskN);

        } else{

            const lateTime = checkDue - checkNow;
            setTimeout(taskN => { timeOut(taskN)}, lateTime);
        }
        if (manager.database[`${task}`].location === "done"){
            const card = document.querySelector(`[data-name2 = ${queryN}]`);
            const btn = card.querySelector("#archiveBtn");
            btn.style.visibility = "visible";
        }
    }
}