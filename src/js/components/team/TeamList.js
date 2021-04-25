import { teamItem, addTeamButton } from "../../templete/team.js";

export default class TeamList {
  constructor({ containerEl, teamData, onGetTeamMembers, onCreateTeam }) {
    this.containerEl = containerEl;
    this.teamListEl = document.createElement("div");
    this.teamListEl.classList.add("team-list-container");
    this.addTeamButton = document.querySelector("#add-team-button");
    this.teamData = teamData;
    this.handleGetTeamMembers = onGetTeamMembers;
    this.handleCreateTeam = onCreateTeam;

    this.init();
    this.render();
  }

  init() {
    this.containerEl.innerHTML = "";
    this.containerEl.append(this.teamListEl);
    this.teamListEl.addEventListener("click", (e) => this.teamClickHandler(e));
  }

  teamClickHandler(e) {
    if (e.target.id === "add-team-button") {
      const teamName = prompt("팀 이름을 입력해주세요");
      this.handleCreateTeam(teamName);
      return;
    }

    e.preventDefault();
    const teamId = e.target.closest(".team-card-container").id;
    this.handleGetTeamMembers(teamId);
  }

  setState(teamData) {
    this.teamData = teamData;
    this.render();
  }

  render() {
    if (!this.teamData) return;
    this.teamListEl.innerHTML = this.teamData
      .map((data) => teamItem(data))
      .join("");

    this.teamListEl.insertAdjacentHTML("beforeend", addTeamButton());
  }
}
