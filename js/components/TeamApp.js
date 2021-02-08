import TeamList from "./TeamList.js";
import { Team } from "../apis/index.js";

export default function TeamApp(appEl) {
  this.init = async () => {
    const listEl = appEl.querySelector(".team-list-container");

    this.teams = (await Team.getTeams()) ?? [];

    this.teamList = new TeamList(listEl, this);

    this.render();
  };

  this.createTeam = async (name) => {
    await Team.addTeam(name);

    this.teams = await Team.getTeams();
    this.render();
  };

  this.render = () => {
    this.teamList.render();
  };

  this.init();
}
