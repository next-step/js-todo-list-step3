import { API } from "../api.js";
import { getAllTodoList, $todoApps, teamId } from "./showTodoList.js";

const workDeleteAll = async ({ target, key }) => {
  if (!target.classList.contains("clear-completed")) return;
  if (confirm("정말 모두 삭제하시겠습니까?")) {
    const memberId = target.closest(".todoapp-container").getAttribute("id");

    await API.deleteAllItem(teamId, memberId);
    getAllTodoList();
  }
};

export const initDeleteAllTodoList = () => {
  $todoApps.addEventListener("click", workDeleteAll);
};