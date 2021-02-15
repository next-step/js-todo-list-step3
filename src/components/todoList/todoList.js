import {onAddTodo} from './addTodo.js';
import {onControlTodo} from './controlTodo.js';
import {onEditPriority} from './editPriority.js';
import {onDeleteAllTodos} from './deleteAllTodos.js';
import {onFilterTodo} from './filterTodo.js';
import {onEditTodo} from './editTodo.js';

export const todoList = () => {
    eventListener();
};

const eventListener = () => {
    const $todoList = document.getElementById('todoapp-list');

    $todoList.addEventListener('keyup', onAddTodo);
    $todoList.addEventListener('click', oneClickEvent);
    $todoList.addEventListener('change', onEditPriority);
    $todoList.addEventListener('dblclick', onEditTodo);
};

const oneClickEvent = ({target}) => {
    const classList = ['destroy', 'toggle'];
    const filters = ['all', 'priority', 'active', 'completed'];

    if (classList.includes(target.className)) return onControlTodo(target, classList);
    if (target.classList.contains('clear-completed')) return onDeleteAllTodos(target);
    if (filters.includes(target.id)) return onFilterTodo(target);
};
