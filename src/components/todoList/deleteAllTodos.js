import {API} from '../../api/api.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';
import {currentTodoList} from '../../utils/collection.js';

export const onDeleteAllTodos = async (target) => {
    const teamId = getTeamId();
    const memberId = target.closest('li').id;

    await API.deleteAllTodos(teamId, memberId);

    loadTodos(teamId, memberId);

    currentTodoList(memberId).querySelector('.todo-count strong').innerHTML = 0;
};
