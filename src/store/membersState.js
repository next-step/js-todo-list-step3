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
    // console.log(this.get());
    this.publish();
  }
}

export default new MemberState();
