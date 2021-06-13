import { $ } from "../lib/util.js";

class TeamTitle {
  constructor({ titleName }) {
    this.titleName = titleName;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    $("#user-title strong").innerHTML = this.titleName;
  }
}

export default TeamTitle;
