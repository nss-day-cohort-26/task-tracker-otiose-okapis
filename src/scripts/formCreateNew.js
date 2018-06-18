

// Get the button that opens the modal
var btn = document.getElementById("newTaskBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("closeSpan")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    newTaskForm.style.display = "block";
}

// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it




const newTaskForm = document.createElement("div");
newTaskForm.id="newClassForm";
newTaskForm.class="modal";

const closeSpan = document.createElement("span");
closeSpan.id="closeSpan";
closeSpan.class="close";
closeSpan.onclick = function() {
    modal.style.display = "none";
}
closeSpan.innerHTML = "&timesl;"


const testHeader = document.createElement("h1");
testHeader.textContent = "this is test content of h1";

window.onclick = function(event) {
    if (event.target === newTaskForm) {
        modal.style.display = "none";
    }
}

closeSpan.onclick = function() {
    newTaskForm.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

newTaskForm.appendChild(closeSpan);
newTaskForm.appendChild(testHeader);

