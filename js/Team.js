import {getTeams, addTeam} from './Api.js';
import {addTeamButtonContainer, teamCardContainer} from './template.js';

export default function Team() {
  this.$teamListContainer = document.querySelector('.team-list-container');
  this.teams = [];

  this.init = async () => {
    this.teams = await getTeams();
    this.render();
    this.bind();
  };

  this.render = () => {
    let teamCardContainers = '';
    this.teams.map(({_id, name, members}) => {
      teamCardContainers += teamCardContainer(_id, name)
    }).join('');

    this.$teamListContainer.innerHTML = teamCardContainers + addTeamButtonContainer;
  };

  this.clickHandler = async ({target}) => {
    if (target.id === 'add-team-button') {
      const result = prompt('팀 이름을 입력해주세요');
      if (!result) {
        return;
      }

      await addTeam(result);

      this.teams = await getTeams();
      this.render();
    }
  };

  this.bind = () => {
    this.$teamListContainer.addEventListener('click', this.clickHandler);
  };

  this.init();
}
