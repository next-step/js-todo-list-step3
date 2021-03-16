import { $teamListContainer } from '../etc/dom.js';
import { loadTeamList } from './loadTeam.js';
import { createTeam } from './createTeam.js';
import { removeTeam } from './removeTeam.js';

export const team = async () => {
  await loadTeamList();

  $teamListContainer.addEventListener('click', filter);
};

team();

const filter = ({ target }) => {
  const targetClass = target.classList.item(0);

  if (targetClass === 'destroy') {
    removeTeam(target);
  } else if (targetClass === 'ripple') {
    createTeam();
  } else {
    const teamId = getTeamId(target);

    target.closest('a').setAttribute('href', `./kanban.html#${teamId}`);
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

export const getTeamId = (target) => {
  const card = target.closest('a').parentElement;
  const teamId = card.dataset.teamid;

  return teamId;
};
