class TeamState {
  constructor() {
    this._team = {};
  }

  get() {
    return this._team;
  }

  set(updateTeam) {
    this._team = updateTeam;
  }
}

export default new TeamState();
