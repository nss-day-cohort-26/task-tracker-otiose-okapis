
const viewArchive = () => {
    const viewArchiveBTN = document.createElement("h3")
    viewArchiveBTN.id = "view-archive-button"
    viewArchiveBTN.innerHTML = "View Archive"
    const buttonContainer = document.querySelector("#button-container")
    buttonContainer.appendChild(viewArchiveBTN)
    const taskGrid = document.querySelector("section")
    const theArchive = document.querySelector(".archive")
    const archiveViewFunction = () => {
        console.log("I'm trying!")
        console.log(taskGrid)
        taskGrid.style.display = "none"
        theArchive.style.display = "flex"
        event.target.remove()
        const showTaskBTN = document.createElement("h3")
        showTaskBTN.id = "show-task-button"
        showTaskBTN.innerHTML = "Show Task List"
        document.querySelector("#button-container").appendChild(showTaskBTN)
        showTaskBTN.addEventListener("click", () => {taskGrid.style.display = "grid"; theArchive.style.display = "none"; event.target.remove(); buttonContainer.appendChild(viewArchiveBTN);})
    }
    viewArchiveBTN.addEventListener("click", () => {archiveViewFunction()})
}

module.exports = viewArchive