import { addTeam } from '../components/addTeam.js';

export const handleTeamListClickEvent = ({ target }) => {
  if (target.id === 'add-team-button') {
    addTeam();
  }
};
