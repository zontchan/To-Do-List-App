const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getLocalTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', todoInteract);
filterOption.addEventListener('change', filterTodo);

function addTodo(e){
    e.preventDefault();
    if(todoInput.value.trim()===''){
        alert('Please enter your `todo`!');
    }else {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        saveLocalTodos(todoInput.value);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
        todoInput.value = '';
    }

}


function todoInteract(e){
    const item = e.target;
    if(item.classList.contains('trash-btn')){
      removeLocalTodos(item.parentElement);
      item.parentElement.classList.add('slide');
      item.parentElement.addEventListener('transitionend', ()=>{
          item.parentElement.remove();
      })
    }
    if(item.classList.contains('complete-btn')){
       item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = Array.from(todoList.children);
   todos.forEach((todo)=>{
        if(e.target.value === 'all'){
          todo.style.display ='flex';
        }
        if(e.target.value === 'completed'){
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }
            else{
                todo.style.display = 'none';
            }
        }
        if(e.target.value === 'incomplete'){
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }
            else{
                todo.style.display = 'none';
            }
        }
    })


}

function saveLocalTodos(item){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos =[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(item);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos(){
    let todos;

    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo)=>{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}