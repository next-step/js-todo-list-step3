import { addTeamButtonTemplate, teamTemplate } from '../templates.js';

export default class TeamList {
  constructor({ onAddTeam }) {
    this.$teamList = document.querySelector('.team-list-container');

    this.$teamList.addEventListener('click', (event) => this.addTeam(event, onAddTeam));
  }

  render(teams) {
    const template = teams.map(teamTemplate);
    this.$teamList.innerHTML = template.join('') + addTeamButtonTemplate;
  }

  addTeam(event, onAddTeam) {
    const addTeamButtonTarget = event.target;
    if (addTeamButtonTarget.id !== 'add-team-button') return;
    onAddTeam();
  }
}
