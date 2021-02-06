import { API } from "../api.js";
import { $todoApps, teamId } from "./TodoList_DOM.js"
import { getAllTodoList } from "./showTodoList.js";

const labelApply = ({ target }) => {
  if (target.nodeName !== "SELECT") return;

  const selecter = target.closest("li").querySelector("select");
  let priority = "NONE";

  if (selecter.value === "1") priority = "FIRST";
  else if (selecter.value === "2") priority = "SECOND";

  workPrioritize({ target }, priority);
}

const labelChange = ({ target }) => {
  if (
    !target.classList.contains("primary") &&
    !target.classList.contains("secondary")
  )
    return;
  const priority = "NONE";

  workPrioritize({ target }, priority);

  labelApply({ target });
}

const workPrioritize = async ({ target }, priority) => {
  const memberId = target.closest(".todoapp-container").id;
  const itemId = target.closest("li").id;

  await API.putPriority(teamId, memberId, itemId, priority);
  getAllTodoList();
};

export const initPrioritizeTodoList = () => {
  $todoApps.addEventListener("change", labelApply);
  $todoApps.addEventListener("click", labelChange);
};