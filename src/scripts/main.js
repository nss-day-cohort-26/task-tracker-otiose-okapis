const manager = require("./manager");


manager.load();
for (task in manager.database){
    manager.placeTask(task);
}