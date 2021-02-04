import { API } from "../API.js";
import { getAllTeams, $teamListContainer } from "./ShowTeamList.js"

export const initDeleteTeam = () => {
  $teamListContainer.addEventListener("auxclick", deleteCurrentTeam);
};

const deleteCurrentTeam = async ({ target }) => {
  if (!target.classList.contains("add-team-button-container")) {
    if (confirm("정말 이 팀을 삭제하시겠습니까?")) {
      const teamId = target.closest("div").getAttribute("id");
      await API.deleteTeam(teamId);
      getAllTeams();
    }
  }
};
