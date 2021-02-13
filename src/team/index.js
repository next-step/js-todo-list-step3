import { loadTeam } from './components/loadTeam.js';
import { handleTeamListClickEvent } from './handler/handleTeamListClickEvent.js';

const init = () => {
  const $teamListContainer = document.querySelector('.team-list-container');

  $teamListContainer.addEventListener('click', handleTeamListClickEvent);
  loadTeam();
};

export const Team = async () => {
  init();
};

window.addEventListener('DOMContentLoaded', () => {
  Team();
});
