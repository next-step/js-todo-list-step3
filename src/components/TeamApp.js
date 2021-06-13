import { $ } from '@utils/utils.js';
import { teamAPI } from '@api/team.js';
import { DOM_ID, MESSAGGE } from '@constants/constants';

import teamsState from '@store/teamsState';

export default class TeamApp {
  constructor() {
    this.$target = $(DOM_ID.TEAM_LIST);

    teamsState.subscribe(this.render.bind(this));

    this.init();
  }

  addEvent() {
    this.$target.addEventListener('click', this.createTeam.bind(this));
  }

  async createTeam({ target }) {
    if (target.id !== 'add-team-button') return;

    const teamName = prompt(MESSAGGE.CREATE_TEAM);
    if (teamName === null) return;

    const team = await teamAPI.createTeam({ name: teamName });
    const prevTeams = teamsState.get();
    teamsState.set(prevTeams.concat(team));
  }

  async init() {
    const teams = await teamAPI.getTeams();
    teamsState.set(teams);

    this.addEvent();
  }

  async render() {
    const teams = teamsState.get();

    let html = teams.reduce(
      (acc, team) =>
        (acc += `<div class="team-card-container">
          <a href="kanban.html?id=${team._id}" class="card">
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
  }
}
