import { $ } from '@utils/utils.js';
import { teamAPI } from '@api/team.js';
import { DOM_ID, MESSAGGE } from '@constants/constants';

import store, { initState, createTeam } from '../modules/team';

export default class TeamApp {
  constructor() {
    this.$target = $(DOM_ID.TEAM_LIST);

    store.subscribe(this.render.bind(this));

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
    store.dispatch(createTeam(team));
  }

  async init() {
    const teams = await teamAPI.getTeams();
    store.dispatch(initState(teams));
    this.addEvent();
  }

  async render() {
    const teams = store.get();

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
