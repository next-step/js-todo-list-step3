import {onAddTeam} from './addTeam.js';
import {onControlTitle} from './controlTitle.js';

export const teamList = () => {
    const $addButton = document.getElementById(`add-team-button`);
    const $teamCard = document.querySelector('.team-list-container');

    $addButton.addEventListener(`click`, onAddTeam);
    $teamCard.addEventListener('mouseover', onControlTitle);
};
