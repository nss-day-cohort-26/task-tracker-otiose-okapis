const DragDropManager = Object.create(null, {
    init: {
        value: () => {
            const stages = document.querySelectorAll(".task-card");
            console.log(stages)
            stages.forEach(stage => {
                // Gain reference of item being dragged
                stage.ondragstart = e => {
                    e.dataTransfer.setData("text", e.target.id)
                    console.log(e.target.id)

                }
            })




            const targets = document.querySelectorAll(".target")
            console.log(targets)

            targets.forEach(target => {
                // Dragover not supported by default. Turn that off.
                target.ondragover = e => e.preventDefault()

                target.ondrop = e => {
                    // Enabled dropping on targets
                    e.preventDefault()

                    // Determine what's being dropped
                    const data = e.dataTransfer.getData("text");
                    console.log(data)
                    // Append card to target component as child
                    let targetDiv = document.getElementById(e.target.id)
                    // console.log(targetDiv.id, "yo")
                    if (targetDiv.id === "doing" || targetDiv.id === "done") {
                        targetDiv.appendChild(document.getElementById(data));
                    } else if ( null ) {
                        console.log("this is correct")
                    }


                }
            })
        }
    }
})

DragDropManager.init()

module.exports = DragDropManager;