import {initAddTodo} from './addTodo.js';
import {initControlTodo} from './controlTodo.js';
import {initEditPriority} from './editPriority.js';
import {initDeleteAllTodos} from './deleteAllTodos.js';
import {initFilterTodo} from './filterTodo.js';
import {initEditTodo} from './editTodo.js';
// import {initSortByPriority} from './sortByPriority.js';

export const todoList = () => {
    initAddTodo();
    initControlTodo();
    initEditPriority();
    initDeleteAllTodos();
    initFilterTodo();
    initEditTodo();
    // initSortByPriority();
};