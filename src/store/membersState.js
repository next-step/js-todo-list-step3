class MemberState {
  constructor() {
    this._members = [];
  }

  get() {
    return this._members;
  }

  set(updatedMembers) {
    this._members = updatedMembers;
  }
}

export default new MemberState();
