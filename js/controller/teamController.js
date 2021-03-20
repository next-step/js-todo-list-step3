'use strict';

import { api } from '../api/api.js';
import TeamView from '../view/teamView.js';
import { teamStore } from '../store/teamStore.js';

class TeamController {
  constructor() {
    this.teamView = new TeamView();
    this.teamView.$teamListContainer.addEventListener(
      'click',
      this.onClickTeamListContainer
    );
  }

  onClickTeamListContainer = ({ target }) => {
    if (target.matches('#add-team-button, .material-icons')) {
      this.addTeam();
      return;
    }
    if (target.matches('.destroy')) {
      this.deleteTeam(target);
      return;
    }
    if (target.matches('.card, .card-title')) {
      this.moveToKanban(target);
      return;
    }
  };

  async load() {
    const teams = await api.getTeams();
    teamStore.setTeams(teams);
    this.teamView.render(teams);
  }

  async addTeam() {
    const teamName = prompt('팀 이름을 작성해주세요');
    if (!teamName) return;
    await api.addTeam(teamName);
    this.load();
  }

  async deleteTeam(target) {
    if (!confirm('해당 팀을 삭제하시겠습니까?')) return;
    const teamId = target.closest('.team-card-container').dataset.id;
    await api.deleteTeam(teamId);
    this.load();
  }

  moveToKanban(target) {
    const teamId = target.closest('.team-card-container').dataset.id;
    const currentTeam = teamStore.findTeam(teamId);
    teamStore.saveCurrentTeam(currentTeam);
    location.href = '/kanban.html';
  }

  init() {
    this.load();
  }
}

export default TeamController;
