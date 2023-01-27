var inputText = document.getElementById("myInput");
var addTask = document.getElementsByClassName("addBtn")[0];
var uol = document.getElementById("myUL");
var TaskItems = document.getElementsByClassName("task-items");
var deleteBtn =  document.createElement("i");
var Theme = document.querySelector('.toggle-mode');

Theme.addEventListener('change', ToggleMode);

function ToggleMode(){
    var body = document.body;
    // body.classList.toggle("dark");
    if(Theme.checked === false) {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('mode', 'light');
    }
    else{
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('mode', 'dark');
    }
}

window.onload = checkMode();
function checkMode(){
    const localStorageMode = localStorage.getItem('mode');
    if(localStorageMode !== null && localStorageMode === "dark"){
        document.body.className = localStorageMode;
        const ThemeSwitch = document.querySelector('.toggle-mode');
        ThemeSwitch.checked = true;
    }
}


// New Task
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

// Compare already exist
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
    var deleteBtn =  document.createElement("i");
    deleteBtn.classList.add('fa');
    deleteBtn.classList.add('fa-trash')
    span.appendChild(deleteBtn);
    listTask[i].appendChild(span);
    var span = document.createElement("span");
    var editBtn = document.createElement('i');
    editBtn.classList.add("fa");
    editBtn.classList.add("fa-pen");
    span.appendChild(editBtn);
    listTask[i].appendChild(span);
    deleteBtn.addEventListener("click", function(){
        onClickDelete(listTask[i]);
        addToAnotherUl(listTask[i].innerText);
        console.log(listTask[i].innerText);
    })
    editBtn.addEventListener('click', function(){
        console.log("edit is available");
    })

}

const checked = (event) => {
    event.target.classList.toggle("checked");
}

const onPressEnter = (e) => {
    if (e.keyCode === 13) {
        checkLength();
    }
}

const onPressAdd = () => {
    checkLength();
}

function checkLength(){
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
    var myListEdit = createDeleteButton();
    var myListItem = createMyLI(title);
    addDeleteButtonToMyLI(myListDelete,myListItem, myListEdit);
    addToMYUL(myListItem);
    myListItem.addEventListener("click", checked);
    myListDelete.addEventListener("click", function(){
        onClickDelete(myListItem);
        addToAnotherUl(myListItem.innerText);
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
    const itemText = listItem.innerText.trim();
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
    var span = document.createElement('span');
    var deletebtn = document.createElement("i");
    deletebtn.classList.add('fa');
    deletebtn.classList.add('fa-trash');
    span.append(deletebtn);
    return span;
}
// return createButton;
function createEditButton(){
    var span = document.createElement("span");
    var editBtn = document.createElement('i');
    editBtn.classList.add("fa");
    editBtn.classList.add("fa-pen");
    span.appendChild(editBtn);
    return span;
}

// return restoreButton;
function createRestoreButton(){
    var span = document.createElement('span');
    var restorebtn = document.createElement("i");
    restorebtn.classList.add('fa');
    restorebtn.classList.add('fa-trash-restore')
    span.appendChild(restorebtn);
    return span;
}
// return ;
function addDeleteButtonToMyLI(deleteButton, listItem, editButton){
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
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