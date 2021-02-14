import {API} from '../../api/api.js';
import {teamCardTemplate, addTeamButtonTemplate} from './teamTemplates.js';

export const loadTeams = async () => {
    const teams = await API.getTeams();
    const $teamList = document.querySelector('.team-list-container');

    $teamList.innerHTML = '';
    teams.map((team) => $teamList.insertAdjacentHTML('beforeend', teamCardTemplate(team.name, team._id)));
    $teamList.insertAdjacentHTML('beforeend', addTeamButtonTemplate());
};