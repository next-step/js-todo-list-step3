import { loadTeam } from './components/loadTeam.js';
import { handleTeamListClickEvent } from './handler/handleTeamListClickEvent.js';

const init = () => {
  const $teamListContainer = document.querySelector('.team-list-container');

  $teamListContainer.addEventListener('click', handleTeamListClickEvent);
};

export const Team = async () => {
  loadTeam();
  init();
};

window.addEventListener('DOMContentLoaded', () => {
  Team();
});
