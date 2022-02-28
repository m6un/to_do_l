const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")

//onkeyup event
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value // user entered value
    if(userEnteredValue.trim() !=0){ // make sure that user have'nt entered only spaces
        addBtn.classList.add("active") // activating add button
    }else{
        addBtn.classList.remove("active") // making add button inactive
    }
}

showTasks(); 

addBtn.onclick = () => { // when the user clicks on the add (+) button
    let userEnteredValue = inputBox.value // taking the user input value
    let getLocalStorage = localStorage.getItem("New Todo"); //retrieving list from local storage
    if(getLocalStorage === null){ //if local storage is empty
        listArray - [] // create a blank array
    }else{
        listArray = JSON.parse(getLocalStorage) //transforming json string into a js object
    }
    listArray.push(userEnteredValue); //pushing to array
    localStorage.setItem("New Todo", JSON.stringify(listArray)) //transform js object into a js string
    showTasks() //calling showtask function
    addBtn.classList.remove("active") // making the addbutton incative after task is added
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData === null){
        listArray = [];
    }else{
        listArray = JSON.parse(getLocalStorageData)
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; // passing array length to show pending tasks
    if(listArray.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove('active')
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick = "deleteTask(${index})"><i class = "fas fa-trash"></i></span></li>`
    })
    todoList.innerHTML = newLiTag; //adding the new li tag inside the ul tag
    inputBox.value = "" // once task added, leaving the input field empty
}

//delete task function 
function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New Todo")
    listArray = JSON.parse(getLocalStorageData)
    listArray.splice(index, 1)
    localStorage.setItem("New Todo", JSON.stringify(listArray))
    showTasks();
}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArray = []
    localStorage.setItem("New Todo", JSON.stringify(listArray))
    showTasks();
}

