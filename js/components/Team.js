import User from "./User.js";

const Team = class extends Set {
  constructor(_id, name) {
    super();
    this._id = _id;
    this.name = name;
  }

  static get(id, name) {
    return new Team(id, name);
  }

  static load(json) {
    const team = new Team(json._id, json.name);
    json.members.forEach((t) => {
      team.addUser(User.load(t));
    });
    return team;
  }

  addUser(user) {
    if (!(user instanceof User)) {
      return console.log('invalid User');
    }
    super.add(user);
  }

  removeUser(user) {
    if (!(user instanceof User)) {
      return console.log('invalid User');
    }
    super.delete(user);
  }

  clearUsers() {
    super.clear();
  }

  getUsers() {
    return [...super.values()];
  }

  getInfo() {
    const {_id, name} = this;
    return {_id, name};
  }

  add() {}

  delete() {}

  clear() {}

  values() {}
}
export default Team;
