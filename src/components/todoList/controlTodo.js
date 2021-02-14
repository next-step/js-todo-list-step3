import {API} from '../../api/api.js';
import {getTeamId} from '../../utils/localStorage.js';
import { loadMembers } from '../memberList/loadMembers.js';
import {loadTodos} from './loadTodos.js';

export const initControlTodo = () => {
    const $todoList = document.getElementById('todoapp-list');
    $todoList.addEventListener('click', onControlTodo);      
};

const onControlTodo = async ({target}) => {
    const classList = ['destroy', 'toggle'];

    if(!classList.includes(target.className)) return;

    const teamId = getTeamId();
    const memberId = target.getAttribute('id');
    const itemId = target.closest('li').getAttribute('id');
    
    const $memberIdList = document.getElementById(`${memberId}`);
    const memberName = $memberIdList.querySelector(`strong`).innerText;

    target.className === 'destroy' ? await API.deleteTodo(teamId, memberId, itemId) : await API.toggleTodo(teamId, memberId, itemId); 
    classList[target.className];
    loadTodos(teamId, memberId);
}