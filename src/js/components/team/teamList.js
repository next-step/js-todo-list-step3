import { $, TEAM_SELECTOR } from "../../utils/dom.js";
import { getClosestAttribute, getCloset } from "../../utils/eventUtils.js";
import { TeamTemplate } from "./team.js";

export default function TeamList() {
  const teamList = $(TEAM_SELECTOR.TEAM_LIST);

  this.render = (teams) => {
    const template = teams.map((team) => TeamTemplate(team));
    teamList.innerHTML = template.join("\n");
  };

  const onClickHandler = (event) => {
    if (!getCloset(event, "a")) return;
    const id = getClosestAttribute(event, "a", "id");
    event.preventDefault();
    location.href = `/kanban.html?id=${id}`;
  };

  teamList.addEventListener("click", onClickHandler);
}
