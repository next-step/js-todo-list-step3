import { TEAM_TITLE_ID } from "../../utils/data.js";

export default function TeamAppTitle({ $target }) {
  this.render = () => {
    this.$teamTitle = document.createElement("h1");
    this.$teamTitle.id = TEAM_TITLE_ID;
    this.$teamTitle.setAttribute("data-username", "Sky");

    this.$span = document.createElement("span");
    this.$span.innerHTML = `<strong>Team</strong>'s Todo Lists`;
    this.$teamTitle.appendChild(this.$span);
    $target.appendChild(this.$teamTitle);
  };

  this.render();
}
