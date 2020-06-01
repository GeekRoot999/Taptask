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
        const inputValue = getInput()
        getCreateLI(inputValue);
        clearInput();
    }
    else{
        alert("Task already Exist");
    }
}

const compareTask = () => {
    let isFound = false;
    var currentList = document.querySelectorAll("li");
    for(let i = 0; i < currentList.length; i++){
        const listTaskValue = currentList[i].innerHTML.split('<span>')[0];
        if(listTaskValue.toLowerCase() == inputText.value.toLowerCase()){
            isFound = true;
            break;
        }
    }
    return isFound;
}


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
        onClickDelete(listTask[i]);
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
    var restoreListItem = createRestoreLI(deletedValue);
    var restoreButton = createRestoreButton();
    addRestoreButtonToRestoreLI(restoreButton, restoreListItem);
    addtoRestoreUL(restoreListItem);
    restoreButton.addEventListener("click", function(){
        onClickRestore(restoreListItem);
        restoreToMYUL(restoreListItem);
    })
}

function getCreateLI (title) {
    var myListDelete = createDeleteButton();
    var myListItem = createMyLI(title);
    addDeleteButtonToMyLI(myListDelete,myListItem);
    addToMYUL(myListItem);
    myListItem.addEventListener("click", checked);
    myListDelete.addEventListener("click", function(){
        onClickDelete(myListItem);
        addToAnotherUl(myListItem.innerText.slice(0, -6));
    });
}

var localStorageListItems =  window.localStorage.getItem("listItems");
if(localStorageListItems){
    var arr = localStorageListItems.split(",");
    arr.forEach(item => {
        if(item != ""){
            getCreateLI(item);
        }
    })
}

function restoreToMYUL(restoreListItem){
    getCreateLI(restoreListItem.innerText);
}

// return ;
function addToMYUL(listItem){
    var addUL = document.getElementById("myUL");
    addUL.appendChild(listItem);
    var listItems = window.localStorage.getItem("listItems") || "";
    const itemText = listItem.innerText.slice(0, -6).trim();
    console.log("itemText", itemText, "listItems", listItems);
    if(listItems.includes(itemText)){
        return;
    }else{
        window.localStorage.setItem("listItems", listItems + itemText + ",");
    }
}

//return ;
function createRestoreUL(){
    var restoreUL = document.getElementById('restoreUL');
    if(restoreUL == null){
        restoreUL = document.createElement("ul");
        restoreUL.setAttribute('id', 'restoreUL')    
    }
    var appendtoRestoreCol = document.getElementsByClassName("delete-header")[0];
    appendtoRestoreCol.appendChild(restoreUL);
    return restoreUL;
}
// return ;
function addtoRestoreUL(listItem){
    var createul = createRestoreUL();
    createul.appendChild(listItem);
}

// return listItem;
function createMyLI(title){
    var listItem = document.createElement("li");
    listItem.innerText=title;
    listItem.classList.add("task-items");
    return listItem;
}
// return listItem;
function createRestoreLI(title){
    var listItem = document.createElement("li");
    listItem.innerText=title;
    return listItem;
}
// return deleteButton;
function createDeleteButton(){
    var deletebtn = document.createElement("button");
    deletebtn.innerText="delete";
    return deletebtn;
}
// return restoreButton;
function createRestoreButton(){
    var restorebtn = document.createElement("button");
    restorebtn.innerText="restore";
    return restorebtn;
}
// return ;
function addDeleteButtonToMyLI(deleteButton, listItem){
    listItem.appendChild(deleteButton);
}
//return ;
function addRestoreButtonToRestoreLI(restoreButton, listItem){
    listItem.appendChild(restoreButton);
}

function clearInput(){
    var inputText = document.getElementById("myInput");
    inputText.value="";
}

function getInput(){
    var inputText = document.getElementById("myInput");
    return inputText.value;
}

function onClickDelete(listItem){
    var ul = document.getElementById("myUL");
    ul.removeChild(listItem); 
}

function onClickRestore(listItem){
    var restoreUL = document.getElementById("restoreUL");
    restoreUL.removeChild(listItem);
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