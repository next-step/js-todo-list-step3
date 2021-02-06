import { teamTemplateHTML } from './template.js';
import { API } from './API.js';
import { loadTeamList } from './LoadTeamList.js';
import { addTeam } from './AddTeam.js';

export let teamList = [];

// const $teamList = document.querySelector('div.team-list-container');
const $addTeamButtonContainer = document.querySelector('div.add-team-button-container');

window.onload = async () => {
  teamList = await loadTeamList();
  // teamList.forEach(team => API.deleteTeam(team));
  renderTeamList(teamList);
}

export const renderTeamList = teamList => {
  teamList.forEach(team => { $addTeamButtonContainer.insertAdjacentHTML('beforebegin', teamTemplateHTML(team)); });
}

