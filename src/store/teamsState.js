import Subject from '@core/Subject.js';

class TeamState extends Subject {
  constructor(reducer) {
    super();
    this._teams = [];
    this.reducer = reducer;
  }

  get() {
    return this._teams;
  }

  set(updateTeams) {
    this._teams = updateTeams;
    this.publish();
  }

  dispatch(action) {
    const newState = this.reducer(this.get(), action);
    this.set(newState);
  }
}

export default TeamState;
