const moment = require("../node_modules/moment");
const manager = require("./manager");



//create form div

const newTaskForm = document.createElement("div");
newTaskForm.id="newTaskForm";
newTaskForm.className="modal";
newTaskForm.style.display="none";

const taskFormContent = document.createElement("div");
taskFormContent.id="taskFormContent";
taskFormContent.className="modal-content";
// add close btn to div

const closeSpan = document.createElement("H4");
closeSpan.id="closeSpan";
closeSpan.className="close clearfix";
closeSpan.onclick = function() {
    modal.style.display = "none";
}
closeSpan.textContent = "Close Window";

//closing events
// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
    newTaskForm.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === newTaskForm) {
        modal.style.display = "none";
    }
}

//add form content to form div

const testHeader = document.createElement("h1");
testHeader.textContent = "Please enter task details";

const inputsDocForm = document.createElement("form");


const nameDiv = document.createElement("div");
const nameLabel = document.createElement("h4");
nameLabel.id = "nameLabel"
nameLabel.textContent = "Task Name: "
const nameInput = document.createElement("input");
nameInput.id = "nameInput";
nameDiv.appendChild(nameLabel);
nameDiv.appendChild(nameInput);

const descriptionDiv = document.createElement("div");
const descriptionLabel = document.createElement("h4");
descriptionLabel.id = "descriptionLabel"
descriptionLabel.textContent = "Task Description: "
const descriptionInput = document.createElement("textarea");
descriptionInput.id = "descriptionInput";
descriptionDiv.appendChild(descriptionLabel);
descriptionDiv.appendChild(descriptionInput);

const dueDateDiv = document.createElement("div");
const dueDateLabel = document.createElement("h4");
dueDateLabel.id = "dueDateLabel"
dueDateLabel.textContent = "Task dueDate: "
const dueDateInput = document.createElement("input");
dueDateInput.id = "dueDateInput";
dueDateDiv.appendChild(dueDateLabel);
dueDateDiv.appendChild(dueDateInput);

const categoryInput = document.createElement("input");
const categoryInputDiv = document.createElement("div");
const categoryInputLabel = document.createElement("h4");
categoryInputLabel.id = "categoryInputLabel"
categoryInputLabel.textContent = "Task categoryInput: "
const categoryInputInput = document.createElement("input");
categoryInputInput.id = "categoryInput";
categoryInputDiv.appendChild(categoryInputLabel);
categoryInputDiv.appendChild(categoryInputInput);

const locationDiv = document.createElement("div");
const locationLabel = document.createElement("h4");
locationLabel.id = "locationLabel"
locationLabel.textContent = "Task location: "
const locationInput = document.createElement("input");
locationInput.id = "locationInput";
locationDiv.appendChild(locationLabel);
locationDiv.appendChild(locationInput);

const submitButton = document.createElement("button");
submitButton.textContent = "Submit";



inputsDocForm.appendChild(nameDiv);
inputsDocForm.appendChild(descriptionDiv);
inputsDocForm.appendChild(dueDateDiv);
inputsDocForm.appendChild(categoryInputDiv);
inputsDocForm.appendChild(locationDiv);
inputsDocForm.appendChild(submitButton);

taskFormContent.appendChild(inputsDocForm);

newTaskForm.appendChild(testHeader);
newTaskForm.appendChild(closeSpan);
newTaskForm.appendChild(taskFormContent);


document.getElementById("modal-form").appendChild(newTaskForm);

const btn = document.getElementById("create-task-button");

btn.onclick = function() {
    newTaskForm.style.display = "block";
}

const createNewTask = () => {
    const inputs = { name: nameInput.value,
        description: descriptionInput.value,
        dueDate: dueDateInput.value,
        category: categoryInput.value,
        location: locationInput.value
    }

    const card = manager.createTask(inputs.name, inputs.description, inputs.dueDate);
    manager.Save()

    // for (let input in inputs) {
    //     switch (input) {
    //         case (location || name || description): if (inputs[input] === "") {
    //             alert("please complete all fields");
    //         }
    //             break;
    //         case dueDate: if (!moment(inputs[input],"YYYY-MM-DD",true).isValid())
    //             alert("please enter a valid date in 'YYYY-MM-DD' format")
    //             break;
    //         default:
    //             break;
    //     }
    // }
};

// for (let input in inputs) {
//     if (inputs[input] === "") {
//         alert("please fill out all fields");
//         break;
//     }
// }


submitButton.addEventListener("click", createNewTask);
// set storage









