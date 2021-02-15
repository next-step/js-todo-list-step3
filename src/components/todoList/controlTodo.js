import {API} from '../../api/api.js';
import {getTeamId} from '../../utils/localStorage.js';
import {loadTodos} from './loadTodos.js';
import {getItemId} from '../../utils/collection.js';

export const onControlTodo = async (target, classList) => {
    const teamId = getTeamId();
    const memberId = target.getAttribute('id');
    const itemId = getItemId(target);

    target.className === 'destroy' ? await API.deleteTodo(teamId, memberId, itemId) : await API.toggleTodo(teamId, memberId, itemId);

    loadTodos(teamId, memberId);
};
