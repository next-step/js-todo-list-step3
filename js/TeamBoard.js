import { getTeamList, addTeam, deleteTeam } from '../api/team.js';
import { addTeamButtonTemplate } from '../utils/template.js';

export default class TeamBoard {
  constructor() {
    this.teams = [];
    this.$teamList = document.querySelector('.team-list-container');

    this.init();
  }

  async init() {
    this.teams = await getTeamList();
    this.addTeamEvent();
    this.render();
  }

  setTeamInfo(teams) {
    this.teams = teams;
    this.render();
  }

  async addTeamRequest(name) {
    try {
      const team = await addTeam(name);
      const addedTeams = [...this.teams, team];
      this.setTeamInfo(addedTeams);
    } catch (e) {
      alert(`addTeamRequest => ${e.message}`);
    }
  }

  async deleteTeamRequest(teamId) {
    try {
      await deleteTeam(teamId);
      const filteredTeams = this.teams.filter((team) => team._id !== teamId);
      this.setTeamInfo(filteredTeams);
      alert('삭제되었습니다.');
    } catch (e) {
      alert(`deleteTeamRequest => ${e.message}`);
    }
  }

  addTeamEvent() {
    this.$teamList.addEventListener('click', ({ target }) => {
      if (target.className === 'destroy') {
        const $teamCard = target.closest('.team-card-container');
        this.deleteTeamRequest($teamCard.id);
        return;
      }

      const $addTeamButton = target.closest('#add-team-button');
      if ($addTeamButton) {
        const result = prompt('팀 이름을 입력해주세요');
        const name = result.trim();
        if (name) {
          this.addTeamRequest(name);
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
          <button class="destroy"></button>
        </div>
      `;
    });
    this.$teamList.innerHTML = teamList.join('') + addTeamButtonTemplate;
  }
}
