import { addTeam } from '../components/addTeam.js';
import { deleteTeam } from '../components/deleteTeam.js';

export const handleTeamListClickEvent = ({ target }) => {
  const teamListContainer = {
    'add-team-button': addTeam,
    'delete-team-button': deleteTeam,
  };

  return teamListContainer[target.id] && teamListContainer[target.id]();
};
