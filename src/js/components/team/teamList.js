import { $, TEAM_SELECTOR } from "../../utils/dom.js";
import { TeamTemplate } from "./team.js";

export default function TeamList(app) {
  const teamList = $(TEAM_SELECTOR.TEAM_LIST);

  this.render = (teams) => {
    const template = teams.map((team) => TeamTemplate(team));
    teamList.innerHTML = template.join("\n");
  };
}
