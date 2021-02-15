import {onAddMember} from './addMember.js';

export const memberList = () => {
    eventListener();
};

const eventListener = () => {
    const $addButton = document.getElementById('todoapp-list');
    $addButton.addEventListener('click', onAddMember);
};
