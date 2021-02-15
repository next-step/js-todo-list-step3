import {loadTodos} from '../todoList/loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';
import {currentTodoList} from '../../utils/collection.js';

const selectOption = (memberId, option) => {
    const buttons = currentTodoList(memberId).querySelectorAll('.filters a');

    buttons.forEach((button) => button.classList.remove('selected'));
    currentTodoList(memberId).querySelector(`#${option}`).classList.add('selected');
};

export const onFilterTodo = (target) => {
    const teamId = getTeamId();
    const memberId = target.closest('ul').id;
    const option = target.id;
    
    selectOption(memberId, option);
    loadTodos(teamId, memberId, option);
};


