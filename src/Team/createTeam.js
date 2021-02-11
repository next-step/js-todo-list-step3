import { loadTeamList } from './loadTeam.js';
import { clearAllList } from './team.js';
import { api } from '../api.js';

export const createTeam = async () => {
  const result = prompt('팀 이름을 입력해주세요');

  if (result === null) {
    return;
  }

  const teamName = {
    name: result,
  };

  await api.addTeam(teamName);

  clearAllList();
  loadTeamList();
};
