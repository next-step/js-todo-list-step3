import { initAddTeam } from "./addTeam.js";
import { initDeleteTeam } from "./deleteTeam.js";
import { getAllTeams } from "./showTeamList.js";

const initTeam = () => {
  getAllTeams();
  initAddTeam();
  initDeleteTeam();
};

initTeam();
