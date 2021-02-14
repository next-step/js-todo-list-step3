import {API} from '../../api/api.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';

export const initDeleteAllTodos = () => {
    const $todoList = document.getElementById('todoapp-list');
    $todoList.addEventListener('click', onDeleteAllTodos);
}

const onDeleteAllTodos = async ({target}) => {
    if(target.className !== 'clear-completed') return;
    const teamId = getTeamId();
    const memberId = target.closest('li').id;
    await API.deleteAllTodos(teamId, memberId);

    loadTodos(teamId, memberId);
}