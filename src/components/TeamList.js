import { addTeamButtonTemplate, teamTemplate } from '../templates.js';

export default class TeamList {
  constructor() {
    this.$teamList = document.querySelector('.team-list-container');
  }

  render(teams) {
    const template = teams.map(teamTemplate);
    this.$teamList.innerHTML = template.join('') + addTeamButtonTemplate;
  }
}
