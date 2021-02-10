import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { todoItemTemplateHTML } from '../Template.js';

let filter = "all";

document.addEventListener('click', event => setFilter(event));

const setFilter = async event => {
    const $as = document.querySelectorAll('a');
    const $item = Array.from($as).find($a => $a.contains(event.target));
    if($item === undefined) return;

    const userID = event.target.closest('.todoapp-container').id;
    const user = await loadTodoList(teamID, userID);

    filter = event.target.hash.substr(1);

    renderTodoList(user);
}
  
export const renderTodoList = user => {
    const $todoappContainer = document.querySelector(`.todoapp-container#${user._id}`);
    const $todoList = $todoappContainer.querySelector('.todo-list');

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
    if(filter === "active") return todoList.filter(item => !item.isCompleted);
    if(filter === "completed") return todoList.filter(item => item.isCompleted);
}