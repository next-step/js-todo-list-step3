import { API } from "../api.js";
import { getTeamList, $todoApps, teamId } from "./showTodoList.js";

export const initDeleteAllTodoList = () => {
  $todoApps.addEventListener("click", workDelete);
};

const workDelete = async ({ target, key }) => {
  if (!target.classList.contains("clear-completed")) return;
  if (confirm("정말 모두 삭제하시겠습니까?")) {
    const memberId = target.closest(".todoapp-container").getAttribute("id");

    await API.deleteAllItem(teamId, memberId);
    getTeamList();
  }
};
