import { api } from '../../api/api.js';
import { TEAM, ERR_MSG } from '../../utils/constant.js';
import { loadTeam } from './loadTeam.js';

export const addTeam = async () => {
  const teamNameInput = prompt('추가하실 팀 이름을 입력해주세요.');

  if (!teamNameInput) {
    return;
  }

  const teamName = teamNameInput.trim();

  if (teamName < TEAM.MIN_TEAM_NAME_LEN) {
    alert(ERR_MSG.INVALID_TEAM_NAME_LEN);
    return;
  }

  try {
    await api.addTeam(teamName);
    loadTeam();
  } catch (err) {
    throw new Error(err);
  }
};
