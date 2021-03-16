import { clearAllList, getTeamId } from './team.js';
import { loadTeamList } from './loadTeam.js';
import { api } from '../etc/api.js';
import { showMessage } from '../etc/validator.js';

export const removeTeam = async (target) => {
  showMessage('정말 이 팀을 삭제하시겠습니까?');

  const teamId = getTeamId(target);

  await api.deleteTeam(teamId);

  clearAllList();
  loadTeamList();
};
