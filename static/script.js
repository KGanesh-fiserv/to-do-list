
//counters
var num = 0
//eventListners
document.getElementById("add").addEventListener("click",addTask)
document.getElementById('dark mode').addEventListener("click", darkMode)
document.getElementById("clear").addEventListener("click", clearTasks)

//Create button
function createButtons(taskInput){
    var labelVal = document.createElement("label")
    labelVal.innerText = taskInput

    var editVal = document.createElement("input")
    editVal.type = "text";
    editVal.classList.add('show');

    var editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerText= "Edit";
    editButton.addEventListener("click", buttonEditPressed)

    var deleteButton= document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText= "Delete";
    deleteButton.addEventListener("click", buttonDeletePressed)

    var check = document.createElement("input");
    check.type = "checkbox";
    check.addEventListener("change", buttonCompletePressed)
    return [check,labelVal,editVal,editButton, deleteButton];
}
//button handler
function buttonEditPressed(e){
    var id = e.target.parentNode.id;
    editTask(id)
}
function buttonDeletePressed(e){
    var id = e.target.parentNode.id;
    deleteTask(id)
}
function buttonCompletePressed(e){
    var id = e.target.parentNode.id;
    completeTask(id)

}
//Tasks
// add task functionality
function addTask() {
    // get the input field and task list elements
    let taskInput = document.getElementById("new-task");
    let taskList = document.getElementById("incomplete-tasks");
    // check if input field is not empty or contains only whitespace
    if (taskInput.value.trim() != "") {
        // create a new list item
        let li = document.createElement("li");
        //Adding buttons to list elements
        var buttonsList = createButtons(taskInput.value)
        for(let i=0; i<buttonsList.length;i++){
            li.appendChild(buttonsList[i]);
        };
        li.id = num;
        num++;
        // display the list item to the task list
        taskList.appendChild(li);

        // clear the input field
        taskInput.value = "";
    }
}
//edit task
function editTask(id){
    listItem = document.getElementById(id);
    let editInput = listItem.querySelector("input[type=text]");
    let labelVal = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    if (containsClass){
        labelVal.innerText = editInput.value;
    }
    else{
        editInput.value = listItem.firstChild.innerText;
    }
    listItem.classList.toggle("editMode");
   

}

//delete task
function deleteTask(id){
    document.getElementById(id).remove();
}
//complete task
function completeTask(id){
    var listItem = document.getElementById(id);

    if(listItem.querySelector("input[type=checkbox]").checked){
        let completedTasks= document.getElementById("completed-tasks");
        completedTasks.appendChild(listItem);
        
    }
    else{
        let incompleteTasks= document.getElementById("incomplete-tasks");
        incompleteTasks.appendChild(listItem);
    }

}
//clear
function clearTasks(){
    var completeTasks= document.getElementById("completed-tasks");
    while( completeTasks.firstChild ){
        completeTasks.removeChild( completeTasks.firstChild );
      }
    var incompleteTasks = document.getElementById("incomplete-tasks");
    while( incompleteTasks.firstChild ){
        incompleteTasks.removeChild( incompleteTasks.firstChild );
      }
}
function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");

}