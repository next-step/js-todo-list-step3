import { $ } from '../utils/utils.js';
import { teamAPI } from '../api/team.js';
import { DOM_ID, MESSAGGE } from '../constants/constants';

export default class TeamApp {
  constructor() {
    this.$target = $(DOM_ID.TEAM_LIST);

    this.render();
  }

  addEvent() {
    $(DOM_ID.ADD_TEAM).addEventListener('click', this.createTeam.bind(this));
  }

  clearEvent() {
    $(DOM_ID.ADD_TEAM).removeEventListener('click', this.createTeam.bind(this));
  }

  async createTeam() {
    const teamName = prompt(MESSAGGE.CREATE_TEAM);
    if (teamName === null) return;

    await teamAPI.createTeam({ name: teamName });
    this.render();
  }

  async render() {
    $(DOM_ID.ADD_TEAM) && this.clearEvent();

    const teams = await teamAPI.getTeams();
    let html = teams.reduce(
      (acc, team) =>
        (acc += `<div class="team-card-container">
          <a href="/kanban.html?id=${team._id}" class="card">
            <div class="card-title">${team.name}</div>
          </a>
        </div>`),
      '',
    );

    html += `
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;

    this.$target.innerHTML = html;
    this.addEvent();
  }
}
