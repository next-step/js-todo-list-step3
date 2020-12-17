import User from "./User.js";
import Task from "./Task";

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
    if (!(user instanceof User)) return console.log('invalid task');
    super.add(user);
  }

  removeUser(user) {
    if (!(user instanceof User)) return console.log('invalid task');
    super.delete(user);
  }

  clearUsers() {
    super.clear();
  }

  getUsers() {
    return [...super.values()];
  }

  getId() {
    return this._id;
  }

  add() {}

  delete() {}

  clear() {}

  values() {}
}
export default Team;
