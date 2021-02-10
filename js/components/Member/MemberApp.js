import { Team } from "../../apis/index.js";

import MemberTitle from "./MemberTitle.js";

export default function MemberApp(appEl, teamId) {
  this.init = async () => {
    const titleEl = appEl.querySelector("#user-title");
    const listEl = appEl.querySelector(".todoapp-list-container");

    const team = await Team.getTeam(teamId);
    ({ name: this.name, members: this.members } = team);

    this.memberTitle = new MemberTitle(titleEl, this);

    this.render();
  };

  this.render = () => {
    this.memberTitle.render();
  };

  this.init();
}
