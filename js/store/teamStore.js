'use strict';

class TeamStore {
  constructor() {
    this.teams = [];
    this.currentTeam = null;
  }

  setTeams(teams) {
    this.teams = teams;
  }

  getTeams() {
    return this.teams;
  }

  setCurrentTeam(team) {
    this.currentTeam = team;
  }

  getCurrentTeam() {
    return this.currentTeam;
  }
}

export const teamStore = new TeamStore();
