const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

let editToDo = null;
//function to add todo
const addToDo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your to do");
    return false;
  }

  //for edit update
  if(addBtn.value === "Edit"){
    editToDo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value= "";
  }else {

  const li = document.createElement("li");
  //create p tag
  const p = document.createElement("p");
  p.innerHTML = inputText;
  li.appendChild(p);

  //create edit btn
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
    //for give class name editBtn ka  multipal class add hai yaha
    editBtn.classList.add("btn", "editBtn");
  li.appendChild(editBtn);

  //create delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Remove";
  //for give class name deleteBtn ka multipal class add hai yaha
  deleteBtn.classList.add("btn", "deleteBtn");
  li.appendChild(deleteBtn);

  //for empty input box Atomaticaly
  todoList.appendChild(li);
  inputBox.value = "";

  saveLocalToDos(inputText);
  }
};

//function to update todo(edit and remove)
const updateToDo = (e) => {
     //console.log(e.target.innerHTML);
     if(e.target.innerHTML === "Remove"){
        //console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
     }

     if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editToDo = e;
     }
}

//save localtodo
const saveLocalToDos = (todo) => {
    let todos;
if(localStorage.getItem("todos")=== null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem("todos"));
}
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    // console.log(todos);
}

//get local todo
const getLocalTodos = () => {
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li");
            //create p tag
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            //create edit btn
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
              //for give class name editBtn ka  multipal class add hai yaha
              editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            //create delete btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            //for give class name deleteBtn ka multipal class add hai yaha
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            // //for empty input box Atomaticaly
            todoList.appendChild(li);
        });
    }
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // Array functions : slice / splice
    console.log(todoIndex);
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addToDo);
todoList.addEventListener('click', updateToDo);
