import { API } from "../api.js";
import { $todoApps, teamId } from "./TodoList_DOM.js"
import { getAllTodoList } from "./showTodoList.js";

const workDelete = async ({ target }) => {
  if (!target.classList.contains("destroy")) return;
  if (confirm("정말 삭제하시겠습니까?")) {
    const memberId = target.closest(".todoapp-container").id;
    const itemId = target.closest("li").id;

    await API.deleteItem(teamId, memberId, itemId);
    getAllTodoList();
  }
};

export const initDeleteTodoList = () => {
  $todoApps.addEventListener("click", workDelete);
};
