import { API } from "../api.js";
import { $todoApps, teamId } from "./TodoList_DOM.js"
import { getAllTodoList } from "./showTodoList.js";


const workCheck = async ({ target }) => {
  if (!target.classList.contains("toggle")) return;

  const li = target.closest("li");
  li.classList.toggle("completed");

  target.toggleAttribute("checked");

  const memberId = target.closest(".todoapp-container").id;
  const itemId = target.closest("li").id;

  await API.putToggle(teamId, memberId, itemId);
  getAllTodoList();
};

export const initCheckTodoList = () => {
  $todoApps.addEventListener("click", workCheck);
};
