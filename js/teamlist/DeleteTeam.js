import { API } from "../api.js";
import { getAllTeamsList } from "./showTeamList.js";
import { $teamListContainer } from "./Team_DOM.js"

const deleteCurrentTeam = async ({ target }) => {
  if (!target.classList.contains("add-team-button-container")) {
    if (confirm("정말 이 팀을 삭제하시겠습니까?")) {
      const teamId = target.closest("div").id;
      await API.deleteTeam(teamId);
      getAllTeamsList();
    }
  }
};

export const initDeleteTeam = () => {
  $teamListContainer.addEventListener("auxclick", deleteCurrentTeam);
};
