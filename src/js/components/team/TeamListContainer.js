import Component from '../../core/Component.js';
import { teamAPI } from "../../api/team.js";
import { store } from "../../store/index.js";

export default class TeamListContainer extends Component {
  async asyncData() {
    await store.dispatch('FETCH_TEAM_LIST');
  }
  
  setEvent() {
    this.addEvent('click', 'addTeam', async _ => {
      const teamName = prompt('팀 이름을 입력해주세요');
      if (teamName.length < 2) return;
      await teamAPI.addTeam(teamName);
      await store.dispatch('FETCH_TEAM_LIST');
    });
  }

  template() {
    return `
      ${store.state.teamList
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
