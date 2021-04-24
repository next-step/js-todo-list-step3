import { User } from "./User";

export class Team {
    constructor({ _id, name, members = []}) {
      this._id = _id;
      this.name =name;
      this.members=members.map(member => new User(member));
    }
  }
  