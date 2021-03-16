import { api } from '../../api/api.js';
import { renderTeam } from '../render/renderTeam.js';

export const loadTeam = async () => {
  try {
    const teams = await api.getTeams();
    if (teams.length) {
      renderTeam(teams);
    }
  } catch (err) {
    throw new Error(err);
  }
};
