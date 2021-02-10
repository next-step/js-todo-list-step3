import { Team } from "/js/apis/index.js";

import MemberTitle from "./MemberTitle.js";
import MemberList from "./MemberList.js";

export default function MemberApp(appEl, teamId) {
  this.init = async () => {
    const titleEl = appEl.querySelector("#user-title");
    const listEl = appEl.querySelector(".todoapp-list-container");

    const team = await Team.getTeam(teamId);
    ({ name: this.name, members: this.members } = team);

    this.memberTitle = new MemberTitle(titleEl, this);
    this.memberList = new MemberList(listEl, this);

    this.render();
  };

  this.render = () => {
    this.memberTitle.render();
    this.memberList.render();
  };

  this.init();
}
