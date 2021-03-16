import { applyPriorityFilter } from "./applyPriorityFilter.js";

function isTodoProperFilterAll(todo) {
  return true;
}
function isTodoProperFilterActive(todo) {
  return !todo.classList.contains("completed");
}
function isTodoProperFilterCompleted(todo) {
  return todo.classList.contains("completed");
}

const filterRules = {
  filterAll: isTodoProperFilterAll,
  filterActive: isTodoProperFilterActive,
  filterCompleted: isTodoProperFilterCompleted,
};

export function applySelectedFilter(userID) {
  const selectedFilter = document.querySelector(
    `li#${userID} div.count-container ul.filters li a.selected`
  );

  if (selectedFilter.classList.contains("all")) {
    applyFilter(userID, filterRules.filterAll);
  } else if (selectedFilter.classList.contains("priority")) {
    applyPriorityFilter(userID);
  } else if (selectedFilter.classList.contains("active")) {
    applyFilter(userID, filterRules.filterActive);
  } else if (selectedFilter.classList.contains("completed")) {
    applyFilter(userID, filterRules.filterCompleted);
  }
}

function applyFilter(userID, filterAction) {
  const todos = document.querySelector(`li#${userID} section.main ul.todo-list`)
    .children;
  for (const todo of todos) {
    if (filterAction(todo)) {
      todo.style.display = "";
    } else {
      todo.style.display = "none";
    }
  }
}
