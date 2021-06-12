import { $ } from '../utils/utils.js';
import { teamService } from '../api/team.js';
import { DOM_ID } from '../constants/constants';

export default class TeamApp {
  constructor() {
    this.$target = $(DOM_ID.TEAM_LIST);
    this.$addBtn = $(DOM_ID.ADD_TEAM);

    this.init();
    this.addEvent();
  }

  addEvent() {
    this.$addBtn.addEventListener('click', () => console.log('click'));
  }

  async init() {
    const teams = await teamService.getTeams();
    this.$target.insertAdjacentHTML('afterbegin', this.render(teams));
  }

  render(teams) {
    return teams.reduce(
      (acc, team) =>
        (acc += `<div class="team-card-container" data-id=${team._id}>
          <a href="/kanban.html" class="card">
            <div class="card-title">${team.name}</div>
          </a>
        </div>`),
      '',
    );
  }
}
