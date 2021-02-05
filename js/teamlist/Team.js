import { initAddTeam } from "./addTeam.js";
import { initDeleteTeam } from "./deleteTeam.js";
import { getAllTeamsList } from "./showTeamList.js";

const initTeam = () => {
  getAllTeamsList();
  initAddTeam();
  initDeleteTeam();
};

initTeam();
