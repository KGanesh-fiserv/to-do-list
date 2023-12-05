//counters
var num = 0
//eventListners
document.getElementById("add").addEventListener("click",addTask);
document.getElementById('dark mode').addEventListener("click", darkMode);
document.getElementById("clear").addEventListener("click", clearTasks);
document.getElementById('Upload File').addEventListener("click", showuploadedFile);
document.getElementById('fileInput').addEventListener('change', parseuploadedFile);
//Creates all buttons and inputvalues for list items
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
//toggle darkmode
function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");

}
//Handling excel file
//showing excel file
function showuploadedFile(){
    document.getElementById("fileInput").classList.toggle("uploadFile");
}
//processing excel file
function parseuploadedFile(e){
    var file = e.target.files[0];
    //arrayList to store objects from file temporarily until they are processed
    var tempScriptObject = []
    //if file exists, reads using jssheets
    if(file){

        const reader = new FileReader();
        reader.onload = function (x) {
            const data = x.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            // goes through eash sheet
            workbook.SheetNames.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                //using the jsondata of each sheet, create objects of all values, pass objects into list to be handled
                for(let i = 0; i< jsonData.length; i++){
                    var temp = jsonData[i][0].split(",");
                    tempScriptObject.push(new toDoList(temp[0], temp[1], temp[2], temp[3], temp[4], temp[5]));
                }
                organizeUploadedFile(tempScriptObject);
            });
        };

        reader.readAsBinaryString(file);
    }
    }
//handling list of ToDoListObjects, sort based on whether complete or incomplete
function organizeUploadedFile(list){
    let completetaskList = document.getElementById("completed-tasks");
    let incompletetaskList = document.getElementById("incomplete-tasks");
    for(let i =0; i<list.length; i++){
        let li = document.createElement("li");
        var buttonsList = createButtons(list[i].taskName)
        for(let i=0; i<buttonsList.length;i++){
            li.appendChild(buttonsList[i]);
        }
        li.id = num;
        if(list[i].completionStatus.trim() == "Completed" && list[i].taskName.trim() != ""){
            num++;
            completetaskList.appendChild(li);
            li.firstChild.checked = true;
        }else if(list[i].completionStatus.trim() == "Incomplete" && list[i].taskName.trim() != ""){
            num++;
            incompletetaskList.appendChild(li);
        }
        else{
            console.log(list[i].completionStatus);
        }
        
    }
    document.getElementById("fileInput").value = "";
    showuploadedFile();
}
class toDoList{
    constructor(taskName, dateCreated, dateCompleted, completionStatus, priority, timeToComplete){
        this.taskName = taskName;
        this.dateCreated = dateCreated;
        this.dateCompleted = dateCompleted;
        this.completionStatus = completionStatus;
        this.priority = priority;
        this.timeToComplete = timeToComplete;
    }

}
