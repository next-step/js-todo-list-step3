import { $teamListContainer } from '../dom.js';
import { loadTeamList } from './loadTeam.js';
import { createTeam } from './createTeam.js';
import { removeTeam } from './removeTeam.js';

export const team = async () => {
  await loadTeamList();

  $teamListContainer.addEventListener('click', filter);
};

const filter = ({ target }) => {
  const targetClass = target.classList.item(0);

  if (targetClass === 'destroy') {
    removeTeam(target);
  } else if (targetClass === 'ripple') {
    createTeam();
  }
};

export const render = (contents) => {
  $teamListContainer.insertAdjacentHTML('beforeend', contents);
};

export const clearAllList = () => {
  while ($teamListContainer.firstChild) {
    $teamListContainer.lastChild.remove();
  }
};
