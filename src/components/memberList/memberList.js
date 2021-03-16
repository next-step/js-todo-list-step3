import {onAddMember} from './addMember.js';

export const memberList = () => {
    const $addButton = document.getElementById('todoapp-list');
    $addButton.addEventListener('click', onAddMember);
};
