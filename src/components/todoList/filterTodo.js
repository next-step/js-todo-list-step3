import {loadMembers} from '../memberList/loadMembers.js';

export const initFilterTodo = () => {
    const $todoList = document.getElementById('todoapp-list');
    $todoList.addEventListener('click', onFilterTodo);
}

const selectOption = (option, memberId) => {
    const $selectedTodoList = document.getElementById(`${memberId}`); 
    const buttons = $selectedTodoList.querySelectorAll('.filters a');

    buttons.forEach((button) => button.classList.remove('selected'));
    $selectedTodoList.querySelector(`#${option}`).classList.add('selected');
};

const show = (option, memberId) => {
    selectOption(option, memberId);
    loadMembers(option);
};

const onFilterTodo = ({target}) => {
    const filters = ['all', 'active', 'completed'];
    if(!filters.includes(target.id)) return;
    const memberId = target.closest('ul').id;
    show(target.id, memberId);
};


