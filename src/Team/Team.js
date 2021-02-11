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
  } // 여기서 else로 a태그에 href속성 추가하는 코드를 넣고 싶단 말이죠
};

export const render = (contents) => {
  $teamListContainer.insertAdjacentHTML('beforeend', contents);
};

export const clearAllList = () => {
  while ($teamListContainer.firstChild) {
    $teamListContainer.lastChild.remove();
  }
};
