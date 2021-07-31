import Component from '../../core/Component.js';
import { teamAPI } from '../../api/team.js';

export default class TeamListContainer extends Component {
  async setup() {
    const teamList = await teamAPI.fetchTeamList();
    this.$state = { teamList };
    this.render();
  }

  setEvent() {
    this.addEvent('click', 'addTeam', async (el) => {
      const teamName = prompt('팀 이름을 입력해주세요');
      if (!teamName.length) return;
      const { _id, name } = await teamAPI.addTeam(teamName);
      this.render();
    });
  }

  template() {
    return `
      ${this.$state.teamList
        .map(
          ({ _id, name }) =>
            `<div class="team-card-container">
              <a href="/kanban.html?id=${_id}" class="card">
                <div class="card-title">
                  ${name}
                </div>
              </a>
            </div>`
        )
        .join('')}
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple" data-action="addTeam">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  }
}
