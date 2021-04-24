import { teamItem } from "../../templete/templete.js";

export default class TeamList {
  constructor({ containerEl, teamData, onGetTeamMembers }) {
    this.containerEl = containerEl;
    this.teamListEl = document.createElement("div");
    this.teamListEl.classList.add("team-list-container");
    this.teamData = teamData;
    this.onGetTeamMembers = onGetTeamMembers;

    this.init();
    this.render();
  }

  init() {
    this.containerEl.innerHTML = "";
    this.containerEl.append(this.teamListEl);
    this.containerEl.addEventListener("click", (e) => {
      e.preventDefault();
      const teamId = e.target.id;
      this.onGetTeamMembers(teamId);
    });
  }

  render() {
    this.teamListEl.innerHTML = this.teamData
      .map((data) => teamItem(data))
      .join("");
  }
}
