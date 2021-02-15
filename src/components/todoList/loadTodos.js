import {API} from '../../api/api.js';
import {todoListTemplate} from '../todoList/todoTemplates.js';
import {filterByPriority} from './filterByPriority.js';
import {currentTodoList} from '../../utils/collection.js';
var $todoList;

const filterTodos =(todos, option) => {
    const filters = {
        all : () => todos,
        active : () => todos.filter((todo) => todo.isCompleted === false),
        completed : () => todos.filter((todo) => todo.isCompleted === true),
    };
    return filters[option]();
};

                          
const renderTodos = (todos, memberId) => {
    todos.map(async (todo) => $todoList.insertAdjacentHTML('beforeend', await todoListTemplate(todo, memberId)));
};

const todoCount = (todos, memberId) => {
    const $todoCountStrong = currentTodoList(memberId).querySelector('.todo-count strong');
    $todoCountStrong.innerHTML = todos.length;
};

export const loadTodos = async (teamId, memberId, option='all') => {
    const user = await API.getTodos(teamId, memberId) ; 
    $todoList = currentTodoList(memberId).querySelector('.todo-list');
    $todoList.innerHTML = '';

    if(!user.todoList) return;
    if(option === 'priority') return filterByPriority(teamId, memberId);

    const todos = await filterTodos(user.todoList, option);
    renderTodos(todos, memberId); 
    todoCount(todos, memberId); 
};
