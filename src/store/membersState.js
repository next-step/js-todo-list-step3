import Subject from '@core/Subject.js';

class MembersState extends Subject {
  constructor(reducer) {
    super();
    this._members = [];
    this.reducer = reducer;
  }

  get() {
    return this._members;
  }

  set(updatedMembers) {
    this._members = updatedMembers;
    this.publish();
  }

  dispatch(action) {
    const newState = this.reducer(this.get(), action);
    this.set(newState);
  }
}

export default MembersState;
