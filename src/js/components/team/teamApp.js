import { ADD_TEAM, GET_TEAMS } from "../../setting/api.js";
import { PATH } from "../../utils/dom.js";
import { parseTeam } from "./team.js";
import TeamEditor from "./teamEditor.js";
import TeamList from "./teamList.js";

export default function TeamApp() {
  let teams = [];

  this.render = async () => {
    const getTeams = await GET_TEAMS();
    teams = getTeams.map((team) => parseTeam(team));
    this.teamList.render(teams);
  };

  this.add = async (name) => {
    const team = await ADD_TEAM(name);
    this.render();
  };

  this.init = () => {
    if (location.pathname === PATH.TEAM) return;
    this.teamList = new TeamList();
    this.teameditor = new TeamEditor(this);
    this.render();
  };
}
