import {API} from '../../api/api.js';
import {loadMembers} from '../memberList/loadMembers.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';
import {MIN_TODO_LENGTH} from './addTodo.js';

export const initEditTodo = () => {
    const $todoList = document.getElementById('todoapp-list');
    $todoList.addEventListener('dblclick', onEditTodo);
}

const editTodo = async (target) => {
    const newTitle = target.value;

    if(newTitle.length < MIN_TODO_LENGTH) return alert(`할 일을 ${MIN_TODO_LENGTH}자 이상 입력해주세요`);
    const teamId = getTeamId();
    const memberId = target.closest('li').querySelector('.view input').id;
    const itemId = target.closest('li').id;

    await API.editTodo(teamId, memberId, itemId, newTitle);
    loadTodos(teamId, memberId);
};

const revertTodo = (target, prevTitle) => {
    const $li = target.closest('li');

    target.value = prevTitle;
    $li.classList.remove('editing');
};

const onUpdateTitle = ({target, key}, prevTitle) => {
    const keyList = {
        Enter : editTodo,
        Escape : revertTodo,
    };
    return keyList[key] && keyList[key](target, prevTitle);
};

const onEditTodo = async ({target}) => {
    if(target.className !== 'label') return;
    const $li = target.closest('li');
    $li.classList.add('editing');
    const prevTitle = target.closest('li').querySelector('.edit').value;
    $li.addEventListener('keyup', (event) => onUpdateTitle(event, prevTitle));
}