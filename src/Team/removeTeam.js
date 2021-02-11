import { clearAllList, getTeamId } from './team.js';
import { loadTeamList } from './loadTeam.js';
import { api } from '../api.js';

export const removeTeam = async (target) => {
  if (!confirm('정말 이 팀을 삭제하시겠습니까?')) {
    return;
  }

  const teamId = getTeamId(target);

  await api.deleteTeam(teamId);

  clearAllList();
  loadTeamList();
};
