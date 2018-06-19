const manager = require("./manager");
Object.defineProperty(manager.database, "category", {
    enumerable: false
});
function reset(){
    localStorage.clear()
}
manager.load();
for (task in manager.database.tasks){
    manager.placeTask(task);
}