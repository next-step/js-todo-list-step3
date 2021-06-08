import { $ } from "../lib/util.js";
import { TEMPLATE } from "../constants/template.js";

import TeamModel from "./model/TeamModel.js";

class TeamList {
  constructor({ teamListData }) {
    this.teamListData = teamListData.map((team) => new TeamModel({ ...team, id: team._id }));
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const template = this.teamListData.map((team) => {
      return `<div class="team-card-container">
      <a href="/kanban.html" class="card">
        <div class="card-title">
          ${team.name}
        </div>
      </a>
    </div>`;
    });

    $(".team-list-container").innerHTML = template.join("") + TEMPLATE.ADD_TEAM_BUTTON;
  }
}

export default TeamList;
