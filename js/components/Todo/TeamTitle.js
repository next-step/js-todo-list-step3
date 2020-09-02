import { TEAM_TITLE_ID } from "../../utils/data.js";

export default function TeamTitle({ $target, teamName }) {
  this.init = () => {
    this.$todoTitle = document.createElement("h1");
    this.$todoTitle.id = TEAM_TITLE_ID;
    this.$todoTitle.setAttribute("username", "sky");
    this.state = {
      name: teamName,
    };

    this.render();
    $target.appendChild(this.$todoTitle);
  };

  this.render = () => {
    this.$todoTitle.innerHTML = `
      <span><strong>${this.state.name}</strong>'s Todo List</span>
    `;
  };

  this.init();
}
