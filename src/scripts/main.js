const manager = require("./manager");

manager.load();
for (task in manager.database.tasks){
    manager.placeTask(task);
}