import { MESSAGE } from '../utils/constants.js';

export default class TeamInput {
  constructor({ $targetTeamList, onInputTeam }) {
    $targetTeamList.addEventListener('click', ({ target: { className } }) => {
      if (className === 'material-icons' || className === 'ripple') {
        const newTeamName = prompt(MESSAGE.REGISTER_TEAM);
        newTeamName && onInputTeam(newTeamName);
      }
    });
  }
}
