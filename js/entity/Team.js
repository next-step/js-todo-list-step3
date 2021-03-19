class Team {
  constructor({ name, _id, members = [] }) {
    this.name = name;
    this._id = _id;
    this.members = [...members];
  }

  addMember(member) {
    // TODO check typeOf User?
    // changing value
    this.members.push(member);
  }
}

export default Team;
