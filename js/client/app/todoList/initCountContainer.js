import { updateCountText } from "./updateCountText.js";
import { applySelectedFilter } from "./filters/filterRules.js";
import { deleteAllTodo } from "../../../serverAPI/user/deleteAllTodo.js";

export function initCountContainer(divCountContainer) {
  divCountContainer.addEventListener("click", onClickFilterButton);
  divCountContainer
    .querySelector("button.clear-completed")
    .addEventListener("click", onClickDeleteAllButton);
}

function isFilterAllButton(target) {
  return target.nodeName === "A" && target.classList.contains("all");
}

function isFilterPriorityButton(target) {
  return target.nodeName === "A" && target.classList.contains("priority");
}

function isFilterActiveButton(target) {
  return target.nodeName === "A" && target.classList.contains("active");
}

function isFilterCompletedButton(target) {
  return target.nodeName === "A" && target.classList.contains("completed");
}

function onClickFilterButton({ target }) {
  if (
    !isFilterAllButton(target) &&
    !isFilterPriorityButton(target) &&
    !isFilterActiveButton(target) &&
    !isFilterCompletedButton(target)
  ) {
    return;
  }

  target
    .closest("ul.filters")
    .querySelector("li a.selected")
    .classList.remove("selected");
  target.classList.add("selected");

  const userID = target.closest("li.todoapp-container").id;
  applySelectedFilter(userID);
  updateCountText(userID);
}

async function onClickDeleteAllButton({ target }) {
  const todos = target
    .closest("div.todoapp")
    .querySelector("section.main ul.todo-list");
  const userID = target.closest("li.todoapp-container").id;
  const teamID = localStorage.getItem("teamID");

  if ((await deleteAllTodo(teamID, userID)) !== null) {
    todos.innerHTML = "";
  }
}
