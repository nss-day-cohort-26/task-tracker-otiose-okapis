const manager = require("./manager");
manager.load();

console.log(manager.database)

for (task in manager.database){
    console.log(task)
    console.log(manager.database[`${task}`].location)
    if (manager.database[`${task}`].location){
        manager.placeTask(manager.database[`${task}`]);
        const checkNow = Date.now();
        const checkDue = new (manager.database[`${task}`].due);
        if (checkNow >= checkDue){
            const card = document.querySelector('#')
        }
    }
}