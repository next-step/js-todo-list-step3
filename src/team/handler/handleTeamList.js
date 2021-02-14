import localStorage from '../../utils/localStorage.js';
import { addTeam } from '../components/addTeam.js';
import { deleteTeam } from '../components/deleteTeam.js';

export const handleTeamList = async ({ target }) => {
  if (target.classList.contains('card')) {
    const currentTeam = {
      id: target.closest('.team-card-container').id,
      name: target.querySelector('.card-title').innerText,
    };

    localStorage.set('currentTeam', currentTeam);
  }

  const teamListContainer = {
    'add-team-button': addTeam,
    'delete-team-button': deleteTeam,
  };

  return teamListContainer[target.id] && teamListContainer[target.id]();
};
