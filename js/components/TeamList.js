import { teamCardContainer, addTeamButtonContainer } from '../utils/template.js';
import api from '../utils/api.js';

export default class TeamList {
  constructor(props) {
    const { $element, teamList, onAddTeam } = props;
    this.$element = $element;
    this.teamList = teamList;
    this.render();

    document.querySelector('#add-team-button').addEventListener('click', async () => {
      const newTeam = prompt('팀 이름을 입력해주세요');
      if (newTeam) {
        await api.addTeam(newTeam);
        onAddTeam();
      }
    });
  }

  render() {
    this.$element.innerHTML = `${this.teamList.map(team => teamCardContainer(team)).join('')}
      ${addTeamButtonContainer}`;
  }

  setState(newTeamList) {
    this.teamList = newTeamList;
    this.render();
  }
}
