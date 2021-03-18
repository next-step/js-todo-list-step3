'use strict';

class TeamStore {
  constructor() {
    this.teams = [];
    this.currentTeamId = '';
  }

  setTeams(teams) {
    this.teams = teams;
  }

  getTeams() {
    return this.teams;
  }

  setCurrentTeamId(teamId) {
    this.currentTeamId = teamId;
  }
}

export const teamStore = new TeamStore();
