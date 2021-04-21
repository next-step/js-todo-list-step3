import { getTeams, addTeam } from "@lib/api";
import { getEl, containsClass } from "@js/util";
import { teamTemplate, teamAddBtnTemplate } from "@js/template";

class TeamList {
  constructor(store) {
    this.store = store;
    this.container = getEl(".team-list-container");
    this.init();
  }

  async init() {
    this.store.on("teamList", this.render.bind(this));
    this.setTeams();
    this.container.addEventListener("click", this.clickDelegationHandler.bind(this));
  }

  async setTeams() {
    const { data: teamList } = await getTeams();
    this.store.set({
      teamList: [...teamList],
    });
  }

  clickDelegationHandler({ target }) {
    if (containsClass(target, "add-team-button")) return this._addTeamHandler();
  }

  async _addTeamHandler() {
    const name = prompt("팀 이름을 입력해주세요.");
    if (name === null) return;
    await addTeam(name);
    this.setTeams();
  }

  render() {
    const { teams } = this.store.get();
    const template = teams.map(({ _id, name }) => teamTemplate(_id, name)).join("");
    this.container.innerHTML = template + teamAddBtnTemplate();
  }
}

export default TeamList;
