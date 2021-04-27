import { ADD_TEAM, GET_TEAMS } from "../../setting/api.js";
import { parseTeam } from "./team.js";
import TeamEditor from "./teamEditor.js";
import TeamList from "./teamList.js";

export default function TeamApp(userApp) {
  const teamList = new TeamList(this);
  new TeamEditor(this);
  let teams = [];

  this.render = async () => {
    const getTeams = await GET_TEAMS();
    teams = getTeams.map((team) => parseTeam(team));
    teamList.render(teams);
  };

  this.add = async (name) => {
    const team = await ADD_TEAM(name);
    this.render();
  };

  this.init = () => {
    this.render();
  };
}
