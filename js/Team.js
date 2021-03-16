import Component from "./core/component.js";
import TeamCard from "./components/TeamCard.js";
import { teamAPI } from "./api/api.js";

class Team extends Component {
  async setup() {
    this.state = await teamAPI.getTeamList();
  }
  template() {
    return `
    <h1 id="user-title" data-username="eastjun">
      <span><strong>Team</strong>'s Todo Lists</span>
    </h1>
    <div class="team-list-container"></div>
    `;
  }
  mounted() {
    const $teamListContainer = document.querySelector(".team-list-container");
    new TeamCard($teamListContainer, { teams: this.state });
  }
}

new Team(document.getElementById("app"));
