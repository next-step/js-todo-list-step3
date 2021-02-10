import { teamTemplateHTML, addTeamButtonHTML } from '../Template.js';
import { loadTeamList } from './LoadTeamList.js';
import { } from './AddTeam.js';

let teamList = [];

const $teamListContainer = document.querySelector('.team-list-container');

window.onload = async () => {
  getTeamList();
}

export const getTeamList = async () => {
  teamList = await loadTeamList();
  clearRenderedTeamList();
  renderTeamList();
}

const clearRenderedTeamList = () => {
  let teamCards = document.querySelectorAll('div.team-card-container');
  teamCards.forEach(teamCard => teamCard.remove());
}

const renderTeamList = () => {
  $teamListContainer.innerHTML = teamList.map(teamTemplateHTML).join('') + addTeamButtonHTML;
}