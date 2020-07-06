import { MESSAGE } from '../utils/constants.js';

export default class TeamInput {
  constructor({ $targetTeamList, onInputTeam }) {
    $targetTeamList.addEventListener(
      'click',
      ({ target: { className, id } }) => {
        if (className === 'material-icons' || id === 'add-user-button') {
          const newTeamName = prompt(MESSAGE.REGISTER_TEAM);
          newTeamName && onInputTeam(newTeamName);
        }
      },
    );
  }
}
