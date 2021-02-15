import {API} from '../../api/api.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';
import {getItemId} from '../../utils/collection.js';

export const onEditPriority = async ({target}) => {
    if(!target.classList.contains('chip')) return;

    const priorityList = {
        0 : 'NONE',
        1 : 'FIRST',
        2 : 'SECOND',
    };

    const teamId = getTeamId();
    const memberId = target.closest('div').querySelector('input').id;
    const itemId = getItemId(target);
    const priority = target.value;

    await API.editPriority(teamId, memberId, itemId, priorityList[priority]);

    loadTodos(teamId, memberId);
};
