import { api } from '../../api/api.js';
import { ERR_MSG } from '../../utils/constant.js';
import { loadTeam } from './loadTeam.js';

export const deleteTeam = async () => {
  const $$cardTitle = document.querySelectorAll('.card-title');
  const targetTeamName = prompt('삭제하실 팀 이름을 입력해주세요.');
  const target = [...$$cardTitle].find(
    (cardTitle) => cardTitle.innerText === targetTeamName,
  );

  if (!target) {
    return alert(ERR_MSG.NOT_EXIST_TEAM_NAME);
  }

  const targetId = target.closest('.team-card-container').id;

  try {
    await api.deleteTeam(targetId);
    loadTeam();
  } catch (err) {
    throw new Error(err);
  }
};
