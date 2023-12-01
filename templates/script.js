
//counters
var num = 1
//eventListners
document.getElementById("add").addEventListener("click",addTask)
document.getElementById('dark mode').addEventListener("click", darkMode)
var editButtons = document.querySelectorAll(".edit");
var deleteButtons = document.querySelectorAll(".delete");
for(let i = 0; i<editButtons.length; i++){
    editButtons[i].addEventListener("click", buttonEditPressed)
}
for(let i = 0; i<deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click", buttonDeletePressed)
}
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

    var completeButton = document.createElement("button");
    completeButton.className = "complete";
    completeButton.innerText= "Complete";
    completeButton.addEventListener("click", buttonCompletePressed)
    return [labelVal,editVal, editButton, deleteButton, completeButton];
}
function createButtonsCompletedEdition(taskInput){
    var labelVal = document.createElement("label");
    console.log(taskInput)
    labelVal.innerText = taskInput;
    console.dir(labelVal)

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
    return [labelVal,editVal, editButton, deleteButton];
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
   console.dir(listItem)
   let editInput = listItem.querySelector("input[type=text]");
   let text = listItem.innerText.split("\n");
   text[0] = editInput.value
   listItem.innerText = text.join('\n')
 

}
//delete task
function deleteTask(id){
    document.getElementById(id).remove();
}
//complete task
function completeTask(id){
    let li = document.createElement("li");
    let completeTasks= document.getElementById("completed-tasks");
    var txt  = document.getElementById(id).querySelector("label").innerText;
    var buttonsList = createButtonsCompletedEdition(txt)
        for(let i=0; i<buttonsList.length;i++){
            li.appendChild(buttonsList[i]);
        }
    li.id = num;
    num++;
    completeTasks.appendChild(li);
    deleteTask(id);

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
    element.classList.toggle("dark-mode")
}