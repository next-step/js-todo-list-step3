import { getTeams, addTeam } from "@lib/api";
import { getEl, containsClass } from "@js/util";
import { teamTemplate, teamAddBtnTemplate } from "@js/template";
import { MESSAGES } from "@constants/constant";

class TeamList {
  constructor(store) {
    this.store = store;
    this.container = getEl(".team-list-container");
    this.init();
  }

  async init() {
    this.store.on("teamList", this.render.bind(this));
    this.setTeamList();
    this.container.addEventListener("click", this.clickDelegationHandler.bind(this));
  }

  async setTeamList() {
    const { data: teamList } = await getTeams();
    this.store.set({
      teamList: [...teamList],
    });
  }

  clickDelegationHandler({ target }) {
    if (containsClass(target, "add-team-button")) return this._addTeamHandler();
  }

  async _addTeamHandler() {
    const name = prompt(MESSAGES.ADD_TEAM);
    if (name === null) return;
    await addTeam(name);
    this.setTeamList();
  }

  render() {
    const { teamList } = this.store.get();
    const template = teamList.map((team) => teamTemplate(team)).join("");
    this.container.innerHTML = template + teamAddBtnTemplate();
  }
}

export default TeamList;
