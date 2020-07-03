import { MESSAGE } from './util/constants.js';

export default class TeamInput {
  constructor({ $targetTeamList, onInputTeam }) {
    this.$targetTeamList = $targetTeamList;
    $targetTeamList.addEventListener('click', ({ target: { className } }) => {
      if (className === 'material-icons' || className === 'ripple') {
        const newTeamName = prompt(MESSAGE.REGISTER_TEAM);
        newTeamName && onInputTeam(newTeamName);
      }
    });
  }
}
