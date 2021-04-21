import { getTeams, addTeam } from "@lib/api";
import { getEl, containsClass } from "@js/util";
import { teamTemplate, teamAddButtonTemplate } from "@js/template";

class TeamList {
  constructor(store) {
    this.store = store;
    this.container = getEl(".team-list-container");
    this.init();
  }

  async init() {
    this.store.on("teams", this.renderTeamList.bind(this));
    this.setTeams();
    this.container.addEventListener("click", this.clickDelegationHandler.bind(this));
  }

  async setTeams() {
    const { data: _teams } = await getTeams();
    this.store.set({
      teams: [..._teams],
    });
  }

  renderTeamList() {
    const { teams } = this.store.get();
    const template = teams.map(({ _id, name }) => teamTemplate(_id, name)).join("");
    this.container.innerHTML = template + teamAddButtonTemplate();
  }

  clickDelegationHandler({ target }) {
    if (containsClass(target, "add-team-button")) return this._addTeamHandler();
  }

  async _addTeamHandler() {
    const name = prompt("팀 이름을 입력해주세요.");
    if (!name) alert("팀 이름을 정확히 입력해주세요.");
    await addTeam(name);
    this.setTeams();
  }
}

export default TeamList;
