import Subject from '@core/Subject.js';

class MemberState extends Subject {
  constructor() {
    super();
    this._members = [];
  }

  get() {
    return this._members;
  }

  set(updatedMembers) {
    this._members = updatedMembers;
    this.publish();
  }
}

export default new MemberState();
