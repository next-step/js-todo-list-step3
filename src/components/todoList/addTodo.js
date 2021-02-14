import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';
export const MIN_TODO_LENGTH = 2;

export const initAddTodo = () => {
    const $todoList = document.getElementById('todoapp-list');
    $todoList.addEventListener('keyup', onAddTodo);
};

const onAddTodo = async ({target, key}) => {
    if(!target.classList.contains('new-todo')) return;
    if(key !== 'Enter') return;
    const todoTitle = target.value;
    if(todoTitle.length < MIN_TODO_LENGTH) return alert(`할 일을 ${MIN_TODO_LENGTH}글자 이상 입력해주세요.`);
    
    const teamId = getTeamId();
    const memberId = target.closest('li').getAttribute('id'); 

    await API.addTodo(teamId, memberId, todoTitle);
    loadTodos(teamId, memberId);
    target.value = '';
};