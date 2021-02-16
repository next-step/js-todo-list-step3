import { api } from '../../api/api.js';
import localStorage from '../../utils/localStorage.js';
import { renderMember } from './renderMember.js';

export const loadMembers = async () => {
  const currentTeam = localStorage.get('currentTeam');

  try {
    const team = await api.getTeam(currentTeam.id);
    renderMember(currentTeam.id, team.members);
  } catch (err) {
    throw new Error(err);
  }
};
