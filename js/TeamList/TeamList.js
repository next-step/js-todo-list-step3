import { teamTemplateHTML } from '../Template.js';
import { loadTeamList } from './LoadTeamList.js';
import { } from './AddTeam.js';

let teamList = [];

const $addTeamButtonContainer = document.querySelector('div.add-team-button-container');

window.onload = async () => {
  getTeamList();
}

export const getTeamList = async () => {
  teamList = await loadTeamList();
  // teamList.forEach(team => API.deleteTeam(team));
  clearRenderedTeamList();
  renderTeamList();
}

const clearRenderedTeamList = () => {
  let teamCards = document.querySelectorAll('div.team-card-container');
  teamCards.forEach(teamCard => teamCard.remove());
}

const renderTeamList = () => {
  teamList.forEach(team => { $addTeamButtonContainer.insertAdjacentHTML('beforebegin', teamTemplateHTML(team)); });
}