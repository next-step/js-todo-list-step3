import { API } from "../api.js";
import { getAllTodoList, $todoApps, teamId } from "./showTodoList.js";

const workDelete = async ({ target, key }) => {
  if (!target.classList.contains("destroy")) return;
  if (confirm("정말 삭제하시겠습니까?")) {
    const memberId = target.closest(".todoapp-container").getAttribute("id");
    const itemId = target.closest("li").getAttribute("id");

    await API.deleteItem(teamId, memberId, itemId);
    getAllTodoList();
  }
};

export const initDeleteTodoList = () => {
  $todoApps.addEventListener("click", workDelete);
};
