import {API} from '../../api/api.js';
import {todoListTemplate} from '../todoList/todoTemplates.js';
import {sortByPriority} from './sortByPriority.js';

const todoCount = (todos, memberId) => {
    const $todoCountStrong = document.getElementById(`${memberId}`).querySelector('.todo-count strong');
    $todoCountStrong.innerHTML = todos.length;
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

export const loadTodos = async (teamId, memberId, option='all') => {
    const user = await API.getTodos(teamId, memberId) ; //member의 todo list를 불러옴
    const $memberTodoList = document.getElementById(`${memberId}`).querySelector('.todo-list');
    $memberTodoList.innerHTML = '';

    if(!user.todoList) return;
    if(option === 'priority') return sortByPriority(teamId, memberId);
    const todos = await filterTodos(user.todoList, option);
    renderTodos(todos, memberId); 
    todoCount(todos, memberId); 

};
