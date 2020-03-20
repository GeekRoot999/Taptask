var inputText = document.getElementById("myInput");
var addTask = document.getElementsByClassName("addBtn")[0];
var uol = document.getElementById("myUL");
var TaskItems = document.getElementsByClassName("task-items");
var deleteBtn =  document.createElement("button");

function darkMode(){
    var dark = document.body;
    dark.classList.toggle("dark")
}

const newTask = () => {
    const Compare = compareTask();
    if(Compare === false){
        var span = document.createElement("span");
        var deleteBtn =  document.createElement("button");
        deleteBtn.innerText = "delete";
        span.appendChild(deleteBtn);
        var listTask = document.createElement("li");
        listTask.appendChild(document.createTextNode(inputText.value));
        listTask.addEventListener("click", checked);
        listTask.appendChild(span);
        deleteBtn.addEventListener("click", deleteItem)
        listTask.classList.add("task-items");
        uol.appendChild(listTask);
        inputText.value = "";
    }
    else{
        alert("Task already Exist");
    }
}

const deleteItem = () => {
    uol.removeChild(listTask);
    addToAnotherUl(listTask.innerText.slice(0, -6));
}

const compareTask = () => {
    let isFound = false;
    var currentList = document.querySelectorAll("li");
    for(let i = 0; i < currentList.length; i++){
        const listTaskValue = currentList[i].innerHTML.split('<span>')[0];
        // console.log("comparing", listTaskValue, "input", inputText.value);
        if(listTaskValue.toLowerCase() == inputText.value.toLowerCase()){
            isFound = true;
            break;
        }
    }
    return isFound;
}

// const newTask = () => {
//     var currentList = document.querySelectorAll("li");
//     for(let i = 0; i < currentList.length; i++){
//         const listTaskValue = currentList[i].innerHTML.split('<span>')[0];
//         if(listTaskValue.toLowerCase() == inputText.value.toLowerCase()){
//             alert("task alreay exist");
//             return;
//         }
//     }
//     var span = document.createElement("span");
//     var deleteBtn =  document.createElement("button");
//     deleteBtn.innerText = "delete";
//     span.appendChild(deleteBtn);
//     var listTask = document.createElement("li");
//     listTask.appendChild(document.createTextNode(inputText.value));
//     listTask.addEventListener("click", checked);
//     listTask.appendChild(span);
//     deleteBtn.addEventListener("click", function(){
//         uol.removeChild(listTask);
//     })
//     listTask.classList.add("task-items");
//     uol.appendChild(listTask);
//     inputText.value = "";
// }

var listTask = document.querySelectorAll("li");
console.log(listTask);
for(let i = 0; i < listTask.length; i++){
    listTask[i].addEventListener("click", function(){
        event.target.classList.toggle("checked");
    });
    var span = document.createElement("span");
    var deleteBtn =  document.createElement("button");
    deleteBtn.innerText = "delete";
    span.appendChild(deleteBtn);
    listTask[i].appendChild(span);
    deleteBtn.addEventListener("click", function(){
        uol.removeChild(listTask[i]);
        addToAnotherUl(listTask[i].innerText.slice(0, -6));
    })
}

const checked = (event) => {
    event.target.classList.toggle("checked");
}

const onPressEnter = (e) => {
    if (e.keyCode === 13) {
        if (inputText.value.length > 0) {
            newTask();
        }
        else {
            alert("Enter text to add Task error not here");
        }
    }
}

const onPressAdd = () => {
    if (inputText.value.length > 0) {
        newTask();
    }
    else {
        alert("Enter text to add Task error not here");
    }
}

addTask.addEventListener("click", onPressAdd);

inputText.addEventListener("keypress", onPressEnter);


function addToAnotherUl(deletedValue) {
    var deleteul = document.createElement("ul");
    var deletelist = document.createElement("li");
    deletelist.innerText = deletedValue;
    console.log(deletelist);
    console.log(deletedValue);
    deleteul.appendChild(deletelist);
    document.getElementsByClassName("delete-header")[0].appendChild(deleteul);
    var restoreBtn = document.createElement("button");
    var restore = document.createTextNode("restore");
    restoreBtn.appendChild(restore);
    deletelist.appendChild(restoreBtn);
    console.log(deletelist);
    restoreBtn.addEventListener("click", function(){
        deleteul.removeChild(deletelist);
        uol.appendChild(deletelist);
        deletelist.removeChild(restoreBtn);
        var span = document.createElement("span");
        var deleteBtn =  document.createElement("button");
        deleteBtn.innerText = "delete";
        span.appendChild(deleteBtn);
        deletelist.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function(){
            uol.removeChild(deletelist);
            addToAnotherUl(deletelist.innerText);
        })
    })
}
