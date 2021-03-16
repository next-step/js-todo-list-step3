import {API} from '../../api/api.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';
import {MIN_TODO_LENGTH} from '../../utils/constant.js';
import {getItemId} from '../../utils/collection.js';
var $li;

const editTodo = async (target) => {
    const newTitle = target.value;

    if (newTitle.length < MIN_TODO_LENGTH) return alert(`할 일을 ${MIN_TODO_LENGTH}자 이상 입력해주세요`);

    const teamId = getTeamId();
    const memberId = target.closest('li').querySelector('.view input').id;
    const itemId = getItemId(target);

    await API.editTodo(teamId, memberId, itemId, newTitle);

    loadTodos(teamId, memberId);
};

const revertTodo = (target, prevTitle) => {
    target.value = prevTitle;
    $li.classList.remove('editing');
};

const onUpdateTitle = ({target, key}, prevTitle) => {
    const keyList = {
        Enter: editTodo,
        Escape: revertTodo,
    };
    return keyList[key] && keyList[key](target, prevTitle);
};

export const onEditTodo = async ({target}) => {
    if (target.className !== 'label') return;
    $li = target.closest('li');
    const prevTitle = $li.querySelector('.edit').value;

    $li.classList.add('editing');
    $li.addEventListener('keyup', (event) => onUpdateTitle(event, prevTitle));
};
