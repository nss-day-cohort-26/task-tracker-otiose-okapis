const moment = require("../node_modules/moment");
const manager = require("./manager");

const buildElement = (type, id, className, display) => {
    const element = document.createElement(type);
    element.id=id;
    element.className=className;
    if (display) {
        element.style.display=display;
    }
    return element;
}

//create form div

const taskForm = buildElement("div","taskForm","modal","none");
const formContent = buildElement("div","formContent","modal-content");

// add close btn to div

const closeSpan = buildElement("span","closeSpan","close");
closeSpan.textContent = "X";

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === taskForm) {
        taskForm.style.display = "none";
    }
}

//add form content to form div

const formHeader = document.createElement("h1");
formHeader.textContent = "Create New Task";

const inputsForm = document.createElement("form");

const createInputDiv = (itemName) => {
    const newDiv = document.createElement("div");
    newDiv.className = "inputDiv";
    const label = document.createElement("span");
    label.id = (itemName + "Label");
    label.textContent = ("Task " + itemName + ":");
    label.className = "label";
    const input = document.createElement("input");
    input.id = (itemName + "Input");
    input.className = "input";
    newDiv.appendChild(label);
    newDiv.appendChild(input);
    return newDiv;
};

const inputDivs = {
    name:createInputDiv("name"),
    description:createInputDiv("description"),
    dueDate:createInputDiv("dueDate"),
    category:createInputDiv("category")
}

for (let div in inputDivs) {
    inputsForm.appendChild(inputDivs[div]);
}

const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
inputsForm.appendChild(submitButton);

taskForm.appendChild(formHeader);
taskForm.appendChild(closeSpan);
formContent.appendChild(inputsForm);
taskForm.appendChild(formContent);

document.getElementById("modal-form").appendChild(taskForm);

const btn = document.getElementById("create-task-button");

btn.onclick = function() {
    taskForm.style.display = "block";
}

const createNewTask = () => {
    manager.createTask(inputDivs.name.querySelector("input").value, inputDivs.description.querySelector("input").value, inputDivs.dueDate.querySelector("input").value, inputDivs.category.querySelector("input").value);
    manager.save
};

submitButton.addEventListener("click", createNewTask);










