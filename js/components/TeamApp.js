import TeamList from "./TeamList.js";

export default function TeamApp(appEl) {
  this.init = async () => {
    const listEl = appEl.querySelector(".team-list-container");

    this.teams = [];

    this.teamList = new TeamList(listEl, this);

    this.render();
  };

  this.render = () => {
    this.teamList.render();
  };

  this.init();
}
