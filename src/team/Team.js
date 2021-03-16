import { loadTeam } from './components/loadTeam.js';
import { handleTeamList } from './handler/handleTeamList.js';

const init = () => {
  const $teamListContainer = document.querySelector('.team-list-container');

  $teamListContainer.addEventListener('click', handleTeamList);
};

export const Team = () => {
  loadTeam();
  init();
};

window.addEventListener('DOMContentLoaded', Team);
