const moment = require("../node_modules/moment");
const manager = require("./manager");

// SUBMISSION ROUTINES

// Create New Category
const createNewCategory = (e) => {
    // add to database
    e.preventDefault();
    newCat = document.getElementById("newCategoryInput");
    if (manager.createNewCategory(newCat.value)) {
        manager.save();

        // add to dropdown
        const categoryInput = document.getElementById("categoryInput");
        let option = document.createElement("option");
        option.text = newCat.value;
        categoryInput.add(option);
    }
}

// Test Then Create New Task
const testFormSubmission = (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput");
    const description = document.getElementById("descriptionInput");
    const dueDate = document.getElementById("dueDateInput");
    const category = document.getElementById("categoryInput");

    // Test each field and take actions
    const setResponse = (status, msg) => {
        if (status === true) {
            submissionResponse.className = "success";
            submissionResponse.textContent = "Submission Successful"
        } else {
            submissionResponse.className = "failure";
            submissionResponse.textContent = msg;
        }
    }

    const nameIsValid = (name) => {
        if (name.value === "") {
            name.style.backgroundColor = "red";
            setResponse(false, "Please fill out all fields");
            return false;
        } else {
            name.style.backgroundColor = "whitesmoke";
            setResponse(true)
            return true;
        }
    }

    const descriptionIsValid = (description) => {
        if (description.value === "") {
            description.style.backgroundColor = "red";
            setResponse(false, "Please fill out all fields");
            return false;
        } else {
            description.style.backgroundColor = "whitesmoke";
            return true;
        }
    }

    const dueDateIsValid = (dueDate) => {
        if (dueDate.value === "") {
            dueDate.style.backgroundColor = "red";
            setResponse(false, "Please fill out all fields");
            return false;
        } else {
            dueDate.style.backgroundColor = "whitesmoke";
            return true;
        }
    }

    const categoryIsValid = (category) => {
        if (category.value === "") {
            category.style.backgroundColor = "red";
            setResponse(false, "Please fill out all fields");
            return false;
        } else {
            category.style.backgroundColor = "whitesmoke";
            return true;
        }
    }

    //execute all tests to innact side effects and build TRUTH ARRAY
    const formValid = [nameIsValid(name), descriptionIsValid(description), dueDateIsValid(dueDate), categoryIsValid(category)]

    //SUCESS ROUTINE
    if (formValid[0] && formValid[1] && formValid[2] && formValid[3]) {
        setResponse(true);
        e.preventDefault();
        manager.createTask(name.value, description.value, dueDate.value, category.value);
        // console.log(manager);
        manager.save();
        taskModal.style.display = "none";
    }
}

// CLEAR FORM inputs when closed
const resetForm = () => {
    const ins = [document.getElementById("nameInput"), document.getElementById("descriptionInput"), document.getElementById("dueDateInput"), document.getElementById("categoryInput")];

    ins.forEach(input => {
        input.value = "";
        if (input.type === "datetime-local") {
            input.value = moment().format("YYYY-MM-DD") + "T23:59";
        }
    })

    const submissionResponse = document.getElementById("submissionResponse");
    submissionResponse.textContent = "";
    submissionResponse.className = "";
}

// DOM WRITING FUNCTIONS

// FOMR PIECE BIULDER for creating modal form elements
const buildElement = (type, id, className, display) => {
    const element = document.createElement(type);
    element.id = id;
    if (className) {
        element.className = className;
    }

    if (display) {
        element.style.display = display;
    }
    return element;
}

// FORM PIECE load categories from database and set category Inputs
const refreshCategories = (select) => {
    // clear all options from dropdown
    for (i = 0; i < select.options.length; i++) {
        categoryInput.options[i] = null;
    }

    // load from database
    manager.load();
    const database = manager.database;
    for (i = 0; i < database.categories.length; i++) {
        let option = document.createElement("option");
        option.text = manager.database.categories[i];
        select.add(option);
        console.log(select);
    }

}

// FORM PIECE function for creating HEADERDIV
const createHeaderDiv = () => {
    const headerDiv = buildElement("div", "headerDiv", "header");

    // add h1 to header div
    const formHeader = buildElement("h2", "formHeader", "header-title");
    formHeader.textContent = "Create New Task";
    headerDiv.appendChild(formHeader);

    // add close button
    const closeSpan = buildElement("h4", "closeSpan", "close clearfix");
    closeSpan.textContent = "Close Window";
    // When the user clicks on <span> (x), close the modal
    closeSpan.onclick = function () {
        taskModal.style.display = "none";
        resetForm();
    }
    headerDiv.appendChild(closeSpan);

    return headerDiv;
}

// FORM PIECE function for creating LABEL/INPUT pairs
const createInputDiv = (itemName, itemPrintName) => {

    const newDiv = document.createElement("div");
    newDiv.className = "inputDiv";
    newDiv.id = itemName + "Div";
    const label = document.createElement("span");
    label.id = (itemName + "Label");
    label.textContent = (itemPrintName + ":");
    label.className = "label";
    newDiv.appendChild(label);

    if (itemName === "name" || itemName === "dueDate") {
        const input = buildElement("input", (itemName + "Input"), "input");
        if (itemName === "dueDate") {
            input.setAttribute("type", "datetime-local");
            input.value = moment().format("YYYY-MM-DD") + "T23:59";
        }
        newDiv.appendChild(input);

    }
    if (itemName === "description") {
        const input = buildElement("textarea", (itemName + "Input"), "input");
        newDiv.appendChild(input);
    }
    if (itemName === "category") {

        const newCategoryDiv = buildElement("div", "newCategoryDiv");

        const select = buildElement("select", (itemName + "Input"), "input");
        refreshCategories(select); // load categories from db and populate select options
        const newCategoryButton = buildElement("button", "newCategoryButton");
        newCategoryButton.textContent = "Create New";
        newCategoryButton.addEventListener("click", createNewCategory);
        const newCategoryInput = buildElement("input", "newCategoryInput");

        newCategoryDiv.appendChild(select);
        newCategoryDiv.appendChild(newCategoryButton);
        newCategoryDiv.appendChild(newCategoryInput);

        newDiv.appendChild(newCategoryDiv);

    }
    return newDiv;
};

// FORM PEICE BUILDER for creating SUBMIT div
const createSubmitButtonDiv = function () {

    const submitButtonDiv = buildElement("div", "submitButtonDiv");

    const submissionResponse = buildElement("div", "submissionResponse");
    const submitButton = buildElement("button", "submitButton");
    submitButton.addEventListener("click", testFormSubmission);
    submitButton.textContent = "Submit";

    submitButtonDiv.appendChild(submissionResponse);
    submitButtonDiv.appendChild(submitButton);

    return submitButtonDiv;
}

// MAIN FORM BUILD FUNCTION
const buildForm = () => {

    //create main modal div
    const taskModal = buildElement("div", "taskModal", "modal", "none");

    //create header div
    const headerDiv = createHeaderDiv();

    //create form to hold user inputs
    const inputsForm = buildElement("form", "inputsForm");

    //create label/input pairs for NAME, DESCRIPTION, DUEDATE, CATEGORY and append to form
    const inputDivs = [
        ["name", "Name"],
        ["description", "Description"],
        ["dueDate", "Due Date"],
        ["category", "Category (optional)"]
    ]
    for (let i = 0; i < inputDivs.length; i++) {
        inputsForm.appendChild(createInputDiv(inputDivs[i][0], inputDivs[i][1]));
    }

    //attach submit button to input form
    inputsForm.appendChild(createSubmitButtonDiv());

    // create div for form content
    const formContent = buildElement("div", "formContent", "modal-content");
    // append form to form content container
    formContent.appendChild(inputsForm);

    // append form header and form content to modal
    taskModal.appendChild(headerDiv);
    taskModal.appendChild(formContent);
    return taskModal;
    // append taskModal to target container in index.html
    //document.getElementById("modal-form").appendChild(taskModal);
}

/////////////////// BUILD AND ATTACH TO BUTTON ///////////////
// Build Form
const taskModal = buildForm();
document.getElementById("modal-form").appendChild(taskModal);
// select button in DOM for triggering show modal form
const btn = document.getElementById("create-task-button");
// add event to button that makes modal form appear on click
btn.addEventListener("click", function () {
    taskModal.style.display = "block";
});