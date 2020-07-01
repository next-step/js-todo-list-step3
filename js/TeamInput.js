export default class TeamInput {
  constructor({ $targetTeamList, onInputTeam }) {
    this.$targetTeamList = $targetTeamList;
    $targetTeamList.addEventListener('click', ({ target: { className } }) => {
      if (className === 'material-icons' || className === 'ripple') {
        const newTeamName = prompt('팀 이름을 입력해주세요');
        onInputTeam(newTeamName);
      }
    });
  }
}
