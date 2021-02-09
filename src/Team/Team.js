import { $teamListContainer } from '../dom.js';
import { loadTeamList } from './loadTeam.js';
import { createTeam } from './createTeam.js';

export const team = async () => {
  await loadTeamList();

  $teamListContainer.addEventListener('click', createTeam);
};

export const render = (contents) => {
  $teamListContainer.insertAdjacentHTML('beforeend', contents);
};

/*
const removeButton = () => {
  $teamListContainer.lastChild.remove();
};
*/

export const clearAllList = () => {
  while ($teamListContainer.firstChild) {
    $teamListContainer.lastChild.remove();
  }
};
