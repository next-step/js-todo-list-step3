import Component from "./core/component.js";
import TeamCard from "./components/TeamCard.js";
import { teamAPI } from "./api.js/api.js";
// const $addTeamButton = document.querySelector("#add-team-button");
// $addTeamButton.addEventListener("click", () => {
//   const result = prompt("팀 이름을 입력해주세요");
// });

class Team extends Component {
  async setup() {
    
    this.state = await teamAPI.getTeamList();
  }
  template() {
    return `
    <h1 id="user-title" data-username="eastjun">
        <span><strong>Team</strong>'s Todo Lists</span>
      </h1>
      <div class="team-list-container">
      
    </div>
    `;
  }
  mounted() {
    const $teamListContainer = document.querySelector(".team-list-container");
    const teams = this.state;
    new TeamCard($teamListContainer, { teams });
  }
}

new Team(document.getElementById("app"));
