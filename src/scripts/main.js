const manager = require("./manager");
manager.load();

console.log(manager.database)
function timeOut(taskM){
    const taskN = manager.database[`${taskM}`].name;
    const cardT = document.querySelector(`[data-name = ${taskN}]`)
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
        const card = document.querySelector(`[data-name = ${taskN}]`)

        if (checkNow >= checkDue){
            timeOut(taskN);
            // const overDue = document.createElement("h5");
            // overDue.setAttribute("id", "overDue");
            // overDue.textContent = "THIS TASK IS OVERDUE"
            // card.appendChild(overDue);
        } else{
            // setTimeout(timeOut(card), )
            // console.log("timing check", checkDue - checkNow);
            const lateTime = checkDue - checkNow;
            setTimeout(taskN => { timeOut(taskN)}, lateTime);
        }
        if (manager.database[`${task}`].location === "done"){
            const card = document.querySelector(`[data-name = ${taskN}]`);
            const btn = card.querySelector("#archiveBtn");
            btn.style.visibility = "visible";
        }
    }
}