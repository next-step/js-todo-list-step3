import { loadTeamList } from './Team.js';
import { $teamListContainer } from '../dom.js';

export const removeTeam = async (target) => {
  if (!confirm('정말 이 팀을 삭제하시겠습니까?')) {
    return;
  }

  const teamId = target.dataset.userid;
  await api.deleteTeam(teamId);

  clearAllList();
  loadTeamsList();
};

const clearAllList = () => {
  while ($teamListContainer.firstChild) {
    $teamListContainer.lastChild.remove();
  }
};
