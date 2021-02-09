import { clearAllList } from './Team.js';
import { loadTeamList } from './loadTeam.js';
import { api } from '../api.js';

export const removeTeam = async (target) => {
  if (!confirm('정말 이 팀을 삭제하시겠습니까?')) {
    return;
  }

  const card = target.closest('a').parentElement;
  const teamId = card.dataset.userid;

  await api.deleteTeam(teamId);

  clearAllList();
  loadTeamList();
};
