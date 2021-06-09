import { $ } from "../lib/util.js";
import { TEMPLATE } from "../constants/template.js";
import { fetchRequest } from "../lib/fetchRequest.js";
import { API_URL, METHOD } from "../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../constants/message.js";

import TeamModel from "./model/TeamModel.js";

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

  async addTeam() {
    const teamName = prompt(INFORM_MESSAGES.ADD_TEAM);
    if (!teamName) return;

    const { response, error } = await fetchRequest(API_URL.TEAMS, METHOD.POST, { name: teamName });

    if (error) return alert(ERROR_MESSAGES.ADD_TEAM);

    this.teamListData.push(new TeamModel({ ...response, id: response._id }));
    this.render();
  }

  registerEventListener() {
    $("#add-team-button").addEventListener("click", this.addTeam.bind(this));
  }
}

export default TeamList;
