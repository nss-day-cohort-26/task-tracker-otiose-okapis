const manager = require("./manager");
manager.load();

console.log(manager.database)

for (task in manager.database){
    console.log(task)
    console.log(manager.database[`${task}`].location)
    if (manager.database[`${task}`].location && manager.database[`${task}`].archive === false){
        manager.placeTask(manager.database[`${task}`]);
        const checkNow = Date.now();
        const checkDue = new (manager.database[`${task}`].due);
        const taskN = manager.database[`${task}`].name;
        if (checkNow >= checkDue){
            const card = document.querySelector(`[data-name = ${taskN}]`)
            const overDue = document.createElement("h4");
            overDue.setAttribute("id", "overDue");
            overDue.textContent = "THIS TASK IS OVERDUE"
            card.appendChild(overDue);
        }
    }
}