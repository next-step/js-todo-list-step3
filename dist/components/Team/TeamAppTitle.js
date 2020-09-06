import { TEAM_TITLE_ID } from "../../utils/data.js";
import { teamAppTitleTemplate, errorCallTemplate } from "../../utils/template.js";

export default function TeamAppTitle({ $target }) {
  if (!(this instanceof TeamAppTitle)) {
    throw new Error(errorCallTemplate);
  }
  this.render = () => {
    this.$teamTitle = document.createElement("h1");
    this.$teamTitle.id = TEAM_TITLE_ID;
    this.$teamTitle.setAttribute("data-username", "Sky");

    this.$span = document.createElement("span");
    this.$span.innerHTML = teamAppTitleTemplate;
    this.$teamTitle.appendChild(this.$span);
    $target.appendChild(this.$teamTitle);
  };

  this.render();
}