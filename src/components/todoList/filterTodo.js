import {loadTodos} from '../todoList/loadTodos.js';
import {getTeamId} from '../../utils/localStorage.js';

export const initFilterTodo = () => {
    const $todoList = document.getElementById('todoapp-list');
    $todoList.addEventListener('click', onFilterTodo);
}

const selectOption = (memberId, option) => {
    const $selectedTodoList = document.getElementById(`${memberId}`); 
    const buttons = $selectedTodoList.querySelectorAll('.filters a');

    buttons.forEach((button) => button.classList.remove('selected'));
    $selectedTodoList.querySelector(`#${option}`).classList.add('selected');
};

const showOption = (teamId, memberId, option) => {
    selectOption(memberId, option);
    loadTodos(teamId, memberId, option);
};

const onFilterTodo = ({target}) => {
    const filters = ['all', 'priority','active', 'completed'];
    if(!filters.includes(target.id)) return;

    const teamId = getTeamId();
    const memberId = target.closest('ul').id;
    showOption(teamId, memberId, target.id);
};


