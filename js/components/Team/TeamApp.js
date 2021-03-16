import { Team } from "/js/apis/index.js";

import TeamList from "./TeamList.js";

export default function TeamApp(appEl) {
  this.init = async () => {
    const listEl = appEl.querySelector(".team-list-container");

    this.teams = (await Team.getTeams()) ?? [];

    this.teamList = new TeamList(listEl, this);

    this.render();
  };

  this.getTeam = (id) => this.teams.find(({ _id }) => _id === id);

  this.createTeam = async (name) => {
    await Team.addTeam(name);

    this.teams = await Team.getTeams();
    this.render();
  };

  this.deleteTeam = async (id) => {
    await Team.deleteTeam(id);

    this.teams = await Team.getTeams();
    this.render();
  };

  this.render = () => {
    this.teamList.render();
  };

  this.init();
}
