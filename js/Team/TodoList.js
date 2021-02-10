import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { todoItemTemplateHTML } from '../Template.js';

let filter = "all";

document.addEventListener('click', event => setFilter(event));

const setFilter = async event => {
    const $as = document.querySelectorAll('a');
    let $item;
    let found = false;
    $as.forEach($a => {
        if($a.contains(event.target)){
            $item = $a;
            found = true;
        }
    })
    if(!found) return;

    const team = { _id : teamID };
    let user = { _id : event.target.closest('li.todoapp-container').id, todoList : [] };
    user = await loadTodoList(team, user);

    filter = event.target.hash.substr(1);

    renderTodoList(user);
}
  
export const renderTodoList = user => {
    const $todoappContainer = document.querySelector(`li.todoapp-container#${user._id}`);
    const $todoList = $todoappContainer.querySelector('ul.todo-list');

    if(!user.todoList || user.todoList.length === 0){
        $todoList.innerHTML = ``;
        return;
    }

    if(filter === "priority"){
        const todoListToRender = sortTodoList(user);
        $todoList.innerHTML = todoListToRender.map(todoItemTemplateHTML).join('');
        return;
    }

    const todoListToRender = filterList(user.todoList, filter);
    $todoList.innerHTML = todoListToRender.map(todoItemTemplateHTML).join('');
}

const sortTodoList = user => {
    console.log(user)
    const todoListToRender = [];
    user.todoList.filter(item => item.priority === "FIRST").forEach(item => todoListToRender.push(item));
    user.todoList.filter(item => item.priority === "SECOND").forEach(item => todoListToRender.push(item));
    user.todoList.filter(item => item.priority === "NONE").forEach(item => todoListToRender.push(item));

    return todoListToRender;
}

const filterList = (todoList, filter) => {
    if(filter === "all") return todoList;
    if(filter === "active") return todoList.filter(item => item.isCompleted === false);
    if(filter === "completed") return todoList.filter(item => item.isCompleted === true);
}