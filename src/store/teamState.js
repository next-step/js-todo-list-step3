import Subject from '@core/Subject.js';

class TeamState extends Subject {
  constructor() {
    super();
    this._team = {};
  }

  get() {
    return this._team;
  }

  set(updateTeam) {
    this._team = updateTeam;
    this.publish();
  }
}

export default new TeamState();
