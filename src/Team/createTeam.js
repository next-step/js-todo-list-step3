import { loadTeamList } from './loadTeam.js';
import { clearAllList } from './Team.js';
import { api } from '../api.js';

export const createTeam = async ({ target }) => {
  const result = prompt('팀 이름을 입력해주세요');

  if (result === null) {
    return;
  }

  const teamName = {
    name: result,
  };

  /*
    removeButton();
    setTimeout(() => {
      render(template.cardContainer(teamName.name));
      render(template.addButton());
    }, 1);
    */

  await api.addTeam(teamName);

  clearAllList();
  loadTeamList();
};
