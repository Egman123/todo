// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoSelect = document.querySelector('.todo-select');
const todoList = document.querySelector('.todo-list');
// EVENT LISTENERS
todoButton.addEventListener('click',  addTodo);
document.addEventListener('DOMContentLoaded', startTodo);
todoList.addEventListener('click', checkTodo);
todoSelect.addEventListener('click', selecttodo);
// FUNCTIONs

function addTodo(event){
    
    event.preventDefault();
    if( !todoInput.value.trim() ) return;
    
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const span1 = document.createElement('span');
    span1.innerText = todoInput.value;      
    todo.appendChild(span1);

    const span2 = document.createElement('span');
    span2.innerHTML = '<i class="fas fa-check"></i>';
    span2.innerHTML += '<i class="fas fa-trash"></i>';
    todo.appendChild(span2);

    todoList.appendChild(todo);
    saveInLocalStorage(todoInput.value);
    todoInput.value = '';

    if(todoSelect.value == 'uncompleted' || todoSelect.value == 'completed'){
        todoSelect.value = 'all';
        const todos = document.querySelectorAll('.todo');
        todos.forEach((todo) => {
            todo.style.display = 'flex';
        });
    }

}

function checkTodo(event){
    let item = event.target;
    if(item.classList[1] === 'fa-trash' ){
       item.parentElement.parentElement.classList.toggle('fall');
       item.parentElement.parentElement.addEventListener('transitionend', ()=>{
        
         removeFromLocalStorage( item.parentElement.parentElement.children[0].innerText);

        item.parentElement.parentElement.remove();
       });
    }
    if(item.classList[1] === 'fa-check'){
        item.parentElement.parentElement.classList.toggle('completed');
    }
}

function selecttodo(event){
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        switch(event.target.value){
            case 'all':todo.style.display = 'flex';break;
            case 'completed':
                if(
                    todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else{todo.style.display = 'none'};
                break;
            case 'uncompleted':
                 if(
                        !todo.classList.contains('completed'))
                        todo.style.display = 'flex';
                    else{todo.style.display = 'none'};
        }
    });
}

function startTodo(){
    todoInput.focus();

    // let todos;
    // if(localStorage.getItem('todos') == null){
    //     todos = [];
    // }else{
    //     todos = JSON.parse( localStorage.getItem('todos') );
    // }

    // todos.forEach( function(text){
    //     const todo = document.createElement('div');
    //     todo.classList.add('todo');
    
    //     const span1 = document.createElement('span');
    //     span1.innerText = text;      
    //     todo.appendChild(span1);
    
    //     const span2 = document.createElement('span');
    //     span2.innerHTML = '<i class="fas fa-check"></i>';
    //     span2.innerHTML += '<i class="fas fa-trash"></i>';
    //     todo.appendChild(span2);
    
    //     todoList.appendChild(todo);
    // } );

    let todos;

    if(localStorage.getItem("todos") == null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    
    todos.forEach((text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const span1 = document.createElement('span');
    span1.innerText = text;      
    todo.appendChild(span1);

    const span2 = document.createElement('span');
    span2.innerHTML = '<i class="fas fa-check"></i>';
    span2.innerHTML += '<i class="fas fa-trash"></i>';
    todo.appendChild(span2);
    todoList.appendChild(todo)

})


}




function saveInLocalStorage(text) {
   let todos;
   if(localStorage.getItem("todos") == null ) {
       todos = [];
   }else {
       todos = JSON.parse(localStorage.getItem("todos"))
   }

   todos.push(text);
   localStorage.setItem("todos", JSON.stringify(todos))
}

function removeFromLocalStorage(text) {
    let todos;
    if(localStorage.getItem("todos") == null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

   let index = todos.indexOf(text);
   todos.splice(index, 1);

   localStorage.setItem("todos", JSON.stringify(todos))
}