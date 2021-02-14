import {API} from '../../api/api.js';
import {todoListTemplate, todoAppContainerTemplate} from '../todoList/todoTemplates.js';

const todoCount = (todos, memberId) => {
    const $todoCountStrong = document.getElementById(`${memberId}`).querySelector('.todo-count strong');
    $todoCountStrong.innerHTML = todos.length;
};
                               
const renderTodoAppContainer = (memberId, memberName) => {
    const $todoAppList = document.getElementById(`todoapp-list`);
    $todoAppList.insertAdjacentHTML('beforeend', todoAppContainerTemplate(memberId, memberName));
};

const renderTodos = (todos, memberId) => {
    const $todoList = document.getElementById(`${memberId}`);
    const li = $todoList.querySelector('.todo-list');

    todos.map(async (todo) => li.insertAdjacentHTML('beforeend', await todoListTemplate(todo, memberId)));
};

const filterTodos =(todos, option) => {
    const filters = {
        all : () => todos,
        active : () => todos.filter((todo) => todo.isCompleted === false),
        completed : () => todos.filter((todo) => todo.isCompleted === true),
    };
    return filters[option]();
};

export const loadTodos = async (teamId, member, option) => {
    const memberId = member._id;
    const memberName = member.name;
    renderTodoAppContainer(memberId, memberName);

    const user = await API.getTodos(teamId, memberId) ; //member의 todo list를 불러옴
    
    if(!user.todoList) return;
    const todos = await filterTodos(user.todoList, option);
    renderTodos(todos, memberId); 
    todoCount(todos, memberId); 

};