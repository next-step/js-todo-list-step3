import { api } from '../../api/api.js';
import { TEAM, MSG, ERR_MSG } from '../../utils/constant.js';
import { loadTeam } from './loadTeam.js';

export const addTeam = async () => {
  const teamNameInput = prompt(MSG.ENTER_NEW_TEAM_NAME);

  if (!teamNameInput) {
    return;
  }

  const teamName = teamNameInput.trim();

  if (teamName < TEAM.MIN_TEAM_NAME_LEN) {
    return alert(ERR_MSG.TOO_SHORT_TEAM_NAME_LEN);
  }

  try {
    await api.addTeam(teamName);
    loadTeam();
  } catch (err) {
    throw new Error(err);
  }
};
