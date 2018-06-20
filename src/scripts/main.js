const manager = require("./manager");
const viewArchive = require("./viewArchive")
console.log("RELOAD")
manager.load();
viewArchive();

console.log(manager.database)

for (task in manager.database){
    console.log(task)
    console.log(manager.database[`${task}`].location)
    if (manager.database[`${task}`].location){
        manager.placeTask(manager.database[`${task}`]);
    }
}