import { getTeam, getTeamList, addTeam } from '../api/team.js';
import { addTeamButtonTemplate } from '../utils/template.js';

export default class TeamBoard {
  constructor() {
    this.$teamList = document.querySelector('.team-list-container');

    this.teams = [];

    this.init();
  }

  async init() {
    this.teams = await getTeamList();
    this.addTeamEvent();
    this.render();
  }

  addTeam(team) {
    this.teams.push(team);
    this.render();
  }

  addTeamEvent() {
    this.$teamList.addEventListener('click', async ({ target }) => {
      const $addTeamButton = target.closest('#add-team-button');

      if ($addTeamButton) {
        const result = prompt('팀 이름을 입력해주세요');
        const name = result.trim();
        if (name) {
          const team = await addTeam(name);
          this.addTeam(team);
        }
      }
    });
  }

  render() {
    const teamList = this.teams.map((team) => {
      return `
        <div id="${team._id}" class="team-card-container">
          <a href="/kanban.html" class="card">
            <div class="card-title">${team.name}</div>
          </a>
        </div>
      `;
    });
    this.$teamList.innerHTML = teamList.join('') + addTeamButtonTemplate;
  }
}
