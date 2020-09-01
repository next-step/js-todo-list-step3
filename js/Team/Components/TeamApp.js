import { validateInstance } from "../../Common/utils.js";
import TeamList from "./TeamList.js";

function TeamApp($target) {
  validateInstance(TeamApp, this);
  this.$target = $target;

  this.initComponents = () => {
    this.teamList = new TeamList(document.querySelector("#team-list"));
  };

  this.initEventListeners = () => {};

  this.render = () => {
    this.$target.innerHTML = `
      <h1>
        <span><strong>Team</strong>'s Todo Lists</span>
      </h1>
      <div id="team-list"></div>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
}

export default TeamApp;
