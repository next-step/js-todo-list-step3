import { Team } from "../../apis/index.js";

export default function MemberApp(appEl, teamId) {
  this.init = async () => {
    this.titleEl = appEl.querySelector(".user-title");
    this.listEl = appEl.querySelector(".todoapp-list-container");

    const team = await Team.getTeam(teamId);
    ({ name: this.name, members: this.members } = team);

    this.render();
  };

  this.render = () => {};

  this.init();
}
