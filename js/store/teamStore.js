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

  findTeam(id) {
    return this.teams.find(({ _id }) => _id === id);
  }

  saveCurrentTeam(currentTeam) {
    localStorage.setItem('crruentTeam', JSON.stringify(currentTeam));
  }

  loadCurrentTeam() {
    const loadedData = localStorage.getItem('crruentTeam');
    const crruentTeam = JSON.parse(loadedData);
    if (!crruentTeam) return;
    this.setCurrentTeam(crruentTeam);
    return crruentTeam;
  }
}

export const teamStore = new TeamStore();
