import { $ } from "../lib/util.js";
import { TEMPLATE } from "../constants/template.js";

import TeamModel from "./model/TeamModel.js";

import { addTeam } from "./event/TeamList.js";

class TeamList {
  constructor({ teamListData }) {
    this.teamListData = teamListData.map((team) => new TeamModel({ ...team, id: team._id }));
    this.init();
  }

  init() {
    this.render();
    this.registerEventListener();
  }

  render() {
    const template = this.teamListData.map((team) => {
      return `<div class="team-card-container">
      <a href="/kanban.html?id=${team.id}" class="card">
        <div class="card-title" value=${team.name}>
          ${team.name}
        </div>
      </a>
    </div>`;
    });

    $(".team-list-container").innerHTML = template.join("") + TEMPLATE.ADD_TEAM_BUTTON;
  }

  registerEventListener() {
    $("#add-team-button").addEventListener("click", addTeam.bind(this));
  }
}

export default TeamList;
