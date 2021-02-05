import { API } from "../api.js";
import { getAllTodoList, $todoApps, teamId } from "./showTodoList.js";

export const initCheckTodoList = () => {
  $todoApps.addEventListener("click", workCheck);
};

const workCheck = async ({ target }) => {
  if (!target.classList.contains("toggle")) return;

  const li = target.closest("li");
  li.classList.toggle("completed");

  if (target.checked) target.setAttribute("checked", "");
  else target.removeAttribute("checked");

  const memberId = target.closest(".todoapp-container").getAttribute("id");
  const itemId = target.closest("li").getAttribute("id");

  await API.putToggle(teamId, memberId, itemId);
  getAllTodoList();
};
