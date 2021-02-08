import { template } from '../template.js';
import { $teamListContainer } from '../dom.js';
import { api } from '../api.js';
import { removeTeam } from './removeTeam.js';

export const filter = ({ button, target }) => {
  const value = target.classList.item(0);

  // removeTeam을 일단 이렇게 호출하고 있는데 이게 잘못됐나? 우클릭이란 방식도 사실 별로
  if (value === 'add-team-button-container') {
    createTeam();
  } else if (button === 2 && value === 'team-card-container') {
    console.log('work now');
    removeTeam(target);
  }
};

export const loadTeamList = async () => {
  const teamList = await api.getTeamList();

  teamList.map((item) => {
    render(template.cardContainer(item.name, item._id));
  });

  render(template.addButton());
};

const createTeam = async () => {
  const result = prompt('팀 이름을 입력해주세요');

  if (result === null) {
    return;
  }

  const teamName = {
    name: result,
  };

  removeButton();

  setTimeout(() => {
    render(template.cardContainer(teamName.name, item._id));
    render(template.addButton());
  }, 1);

  //await api.addTeam(teamName);
};

const render = (contents) => {
  $teamListContainer.insertAdjacentHTML('beforeend', contents);
};

const removeButton = () => {
  $teamListContainer.lastChild.remove();
};
