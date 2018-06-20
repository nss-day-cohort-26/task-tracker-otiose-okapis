class Task {
    constructor(name, descrip, date, category = ""){
        this.name = name;
        this.describe = descrip;
        this.due = date;
        this.category = category;
        this.location = "to-do";
        this.archive = false;
        Object.defineProperty(this, "category", {enumerable: false});


    }

}

module.exports = Task;