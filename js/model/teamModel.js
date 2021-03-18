'use strict';

class TeamModel {
  constructor({ _id, name, members = [] }) {
    this._id = _id;
    this.name = name;
    this.members = members;
  }
}

export default TeamModel;
