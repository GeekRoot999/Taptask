var inputText = document.getElementById("myInput");
var addTask = document.getElementsByClassName("addBtn")[0];
var uol = document.getElementById("myUL");
var listTask = document.getElementsByClassName("task-items");
console.log(listTask);

const newTask = () => {
    var listTask = document.createElement("li");
    listTask.appendChild(document.createTextNode(inputText.value));
    uol.appendChild(listTask);
    inputText.value =" ";
}


const onPressEnter = (e) => {
    if(e.keyCode === 13){
        console.log("hello");
        if(inputText.value.length > 0){
            newTask();
        }
    }
    else{
        alert("Enter text to add Task error not here");
    } 
}

const onPressAdd = () => {
    if(inputText.value.length > 0){
        newTask();
    }
    else{
        alert("Enter text to add Task error not here");
    }
}

addTask.addEventListener("click", onPressAdd);

inputText.addEventListener("keypress", onPressEnter);
