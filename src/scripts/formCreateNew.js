const moment = require("../node_modules/moment");
const manager = require("./manager");

// functions called in this script for creating modal form elements
const buildElement = (type, id, className, display) => {
    const element = document.createElement(type);
    element.id=id;
    element.className=className;
    if (display) {
        element.style.display=display;
    }
    return element;
}

//create main modal div
const taskModal = buildElement("div","taskModal","modal","none");

//create header div
const headerDiv = buildElement("div","headerDiv","header");

// create div for form content
const formContent = buildElement("div","formContent","modal-content");

// add h1 to header div
const formHeader = buildElement("h2","formHeader","header-title");
formHeader.textContent = "Create New Task";
headerDiv.appendChild(formHeader);

const closeSpan = document.createElement("H4");
closeSpan.id="closeSpan";
closeSpan.className="close clearfix";
closeSpan.onclick = function() {
    modal.style.display = "none";
}
closeSpan.textContent = "Close Window";

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
    taskModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === taskModal) {
        taskModal.style.display = "none";
    }
}
headerDiv.appendChild(closeSpan);

//create form to hold user inputs
const inputsForm = document.createElement("form");

//function for creating label/input divs
const createInputDiv = (itemName, itemPrintName) => {
    const newDiv = document.createElement("div");
    newDiv.className = "inputDiv";
    newDiv.id = itemName + "Div";
    const label = document.createElement("span");
    label.id = (itemName + "Label");
    label.textContent = (itemPrintName + ":");
    label.className = "label";
    const input = document.createElement("input");
    input.id = (itemName + "Input");
    input.className = "input";
    newDiv.appendChild(label);
    newDiv.appendChild(input);
    return newDiv;
};

//create label/input pairs for NAME, DESCRIPTION, DUEDATE, CATEGORY
const inputDivs = [
    ["name","Name"],
    ["description","Description"],
    ["dueDate","Due Date"],
    ["category","Category"]
]
for (let i = 0; i < inputDivs.length; i++) {
    inputsForm.appendChild(createInputDiv(inputDivs[i][0],inputDivs[i][1]));
}
//attach submit button to input form
const submitButtonDiv = document.createElement("div");
submitButtonDiv.id = "submitButtonDiv";
const submissionResponse = document.createElement("div");
submissionResponse.id = "submissionResponse";
submissionResponse.textContent = "";
submissionResponse.className = "";
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.id = "submitButton";
submitButtonDiv.appendChild(submissionResponse);
submitButtonDiv.appendChild(submitButton);
inputsForm.appendChild(submitButtonDiv);

// append form to form content container
formContent.appendChild(inputsForm);

// append form header and form content to modal
taskModal.appendChild(headerDiv);
taskModal.appendChild(formContent);

// append taskModal to target container in index.html
document.getElementById("modal-form").appendChild(taskModal);

// select button for triggering show modal form
const btn = document.getElementById("create-task-button");

// add event to button that makes modal form appear on click
btn.onclick = function() {
    taskModal.style.display = "block";
}

const createNewTask = () => {
    manager.createTask(inputDivs.name.querySelector("input").value, inputDivs.description.querySelector("input").value, inputDivs.dueDate.querySelector("input").value, inputDivs.category.querySelector("input").value);
    manager.save();
    event.preventDefault();
    taskForm.style.display = "none";
};


// FORM SUBMISSION
const testFormSubmission = (e) => {
    submissionResponse.textContent = "";
    submissionResponse.className = "";

    const name = inputsForm.querySelector("#nameInput");
    const description = inputsForm.querySelector("#descriptionInput");
    const dueDate = inputsForm.querySelector("#dueDateInput");
    const category = inputsForm.querySelector("#categoryInput");

    const setResponse = (status, msg) => {
        if (status === true) {
            submissionResponse.className = "success";
            submissionResponse.textContent = "Submission Successful"
        } else {
            submissionResponse.className = "failure";
            submissionResponse.textContent = msg;
            e.preventDefault();
        }
    }

    const nameIsValid = () => {
        if (name.value === "") {
            name.style.backgroundColor = "red";
            setResponse(false,"Please fill out all fields");
            return false;
        } else {
            name.style.backgroundColor = "whitesmoke";
            setResponse(true)
            return true;
        }
    }

    const descriptionIsValid = () => {
        if (description.value === "") {
            description.style.backgroundColor = "red";
            setResponse(false,"Please fill out all fields");
            return false;
        } else {
            description.style.backgroundColor = "whitesmoke";
            return true;
        }
    }

    const dueDateIsValid = () => {
        if (dueDate.value === "") {
            dueDate.style.backgroundColor = "red";
            setResponse(false,"Please fill out all fields");
            return false;
        } else {
            dueDate.style.backgroundColor = "whitesmoke";
            return true;
        }
    }

    const categoryIsValid = () => {
        if (category.value === "") {
            category.style.backgroundColor = "red";
            setResponse(false,"Please fill out all fields");
            return false;
        } else {
            category.style.backgroundColor = "whitesmoke";
            return true;
        }
    }

    //execute all tests to innact side effects
    const formValid = [nameIsValid(), descriptionIsValid(), dueDateIsValid(), categoryIsValid()]

    //if the form is complete >> show complete >> pause >> submit form
    if (formValid[0] && formValid[1] && formValid[2] && formValid[3]) {
        setResponse(true);
        setTimeout(function(){console.log("success");},5000);
    }
}
// const createNewTask = () => {
//     /*manager.createTask(inputDivs.name.querySelector("input").value, inputDivs.description.querySelector("input").value, inputDivs.dueDate.querySelector("input").value, inputDivs.category.querySelector("input").value);
//     manager.save*/


// };
// attach FORM SUBMISSION routine to submitButton click
submitButton.addEventListener("click", function(e){testFormSubmission(e);});










