import Component from "../core/component.js";
import { teamAPI } from "../api.js/api.js";
export default class TeamCard extends Component {
  setup() {}
  template() {
    const teams = this.props.teams;
    return `${
      teams
        .map(
          (
            team
          ) => `<div class="team-card-container" id="${team._id}"><a href="/kanban.html" class="card">
      <div class="card-title">${team.name}</div>
    </a></div>`
        )
        .join("") +
      `<div class="add-team-button-container">
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </div>`
    }
  `;
  }
  setEvent() {
    const addNewTeam = async () => {
      const newTeamName = prompt("팀 이름을 입력해주세요.");
      const newTeam = await teamAPI.addNewTeam(newTeamName);

      const $addTeamBtn = document.querySelector(".add-team-button-container");
      console.log(this.$target);
      console.log($addTeamBtn);
      this.$target.insertBefore(
        this.createNewTeamContainer(newTeam),
        $addTeamBtn
      );
    };
    this.addEvent("click", "#add-team-button", addNewTeam);
  }
  createNewTeamContainer(team) {
    const teamCard = document.createElement("div");
    teamCard.classList.add("team-card-container");
    teamCard.id = team._id;
    teamCard.innerHTML = `
    <a href="/kanban.html" class="card">
      <div class="card-title">${team.name}</div>
    </a>
  `;
    return teamCard;
  }
}
