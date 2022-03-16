const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoSelect = document.querySelector(".todo-select");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", todoAdd);
document.addEventListener("DOMContentLoaded", startTodo);
todoList.addEventListener("click", checkTodo);


function todoAdd(e) {
   e.preventDefault();
   if(!todoInput.value.trim()) return

   const todo = document.createElement("div");
   todo.classList.add("todo");

   const span1 = document.createElement("span");
   span1.innerText = todoInput.value;

   const span2 = document.createElement("span");
   span2.innerHTML = "<i class='fas fa-check'></i>";
   span2.innerHTML += "<i class='fas fa-trash'></i>";

   todo.appendChild(span1);
   todo.appendChild(span2);
   todoList.appendChild(todo);
   saveInLocalStorage(todoInput.value)
   todoInput.value = ""
}

function checkTodo(event) {
    let item = event.target
   if(item.classList[1] === "fa-trash") {
       item.parentElement.parentElement.classList.add("fall");
       item.parentElement.parentElement.addEventListener("transitionend", ()=> {
           item.parentElement.parentElement.remove()
       })

   }
   if(item.classList[1] === "fa-check") {
       item.parentElement.parentElement.classList.toggle("completed")
   }
}

function startTodo() {
    todoInput.focus();
    

}

function saveInLocalStorage(text) {
    let todos;
    if(localStorage.getItem("todos") == null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(text);
    localStorage.setItem("todos", JSON.stringify(todos))
}