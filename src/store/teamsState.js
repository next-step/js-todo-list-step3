import Subject from '@core/Subject.js';

class TeamState extends Subject {
  constructor() {
    super();
    this._teams = {};
  }

  get() {
    return this._teams;
  }

  set(updateTeams) {
    this._teams = updateTeams;
    this.publish();
  }
}

export default new TeamState();
