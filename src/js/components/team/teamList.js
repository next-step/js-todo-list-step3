import { $, $closet, $closetAttr, TEAM_SELECTOR } from "../../utils/dom.js";
import { TeamTemplate } from "./team.js";

export default function TeamList() {
  const teamList = $(TEAM_SELECTOR.TEAM_LIST);

  this.render = (teams) => {
    const template = teams.map((team) => TeamTemplate(team));
    teamList.innerHTML = template.join("\n");
  };

  const onClickHandler = (event) => {
    if (!$closet(event.target, "a")) return;
    const id = $closetAttr(event.target, "a");
    event.preventDefault();
    location.href = `/kanban.html?id=${id}`;
  };

  teamList.addEventListener("click", onClickHandler);
}
