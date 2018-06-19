const manager = require("./manager");
Object.defineProperty(manager.database, "category", {
    enumerable: false
});
function reset(){
    localStorage.clear()
}
manager.load();
console.log(manager.database)

for (task in manager.database){
    console.log(task)
    console.log(manager.database[`${task}`].location)
    if (manager.database[`${task}`].location){
        manager.placeTask(manager.database[`${task}`]);
    }
}