export const $ = (selector, target = document) =>
  target.querySelector(selector);

export const $all = (selector, target = document) =>
  target.querySelectorAll(selector);
export const $closet = (selector, target) => target.closest(selector);

export const DEFAULT_SELECTOR = {
  ID: "#",
  CLASS: ".",
};

export const TEAM_SELECTOR = {
  TEAM_LIST: ".team-list-container",
  TEAM_ADD_BUTTON_CONTAINER: ".add-team-button-container",
  TEAM_ADD_BUTTON: "#add-team-button",
  TEAM_TITLE: "#team-title",
  TEAM_TITLE_TAG: "strong",
};

export const MEMBER_SELECTOR = {
  ADD_BUTTON: "#add-user-button",
};

export const TODO_SELCTOR = {
  TODO_LIST_CONTAINER: ".todoapp-list-container",
  TODO_LIST: ["ul", ".todo-list"],
  TODO_APP_CONTAINER: (id) => `.todoapp-container[data-member-id="${id}"]`,
  TODO_INPUT: ".new-todo",
  TODO_MEMBER_ID: [".todoapp-container", "data-member-id"],
  TODO_ID: ["li", "data-key"],
  TODO_EDIT: ["editing"],
  TODO_COUNTER: ["div", ".count-container"],
};

export const PATH = {
  TEAM: "/kanban.html",
};

export const getQueryId = () => {
  const params = new URLSearchParams(location.search);
  return params.get("id");
};
