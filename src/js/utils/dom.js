export const $ = (selector, target = document) =>
  target.querySelector(selector);

export const $all = (selector, target = document) =>
  target.querySelectorAll(selector);
export const $closet = (target, selector) => target.closest(selector);
export const $closetAttr = (target, selector, attribute = "id") =>
  target.closest(selector).getAttribute(attribute);

export const DEFAULT_SELECTOR = {
  ID: "#",
  CLASS: ".",
};

export const TEAM_SELECTOR = {
  TEAM_LIST: ".team-list-container",
  ADD_BUTTON: "#add-team-button",
  TITLE: ["strong", "#team-title"],
  LINK: "a",
};

export const MEMBER_SELECTOR = {
  ADD_BUTTON: "#add-user-button",
};

export const TODO_SELCTOR = {
  CONTAINER: (id) => `.todoapp-container[data-member-id="${id}"]`,
  TODO_LIST_CONTAINER: ".todoapp-list-container",
  TODO_LIST: ".todo-list",
  INPUT: ".new-todo",
  MEMBER_ID: [".todoapp-container", "data-member-id"],
  TODO_ID: ["li", "data-key"],
  EDIT: "editing",
  COUNTER: ["div", ".count-container"],
  SELECTED: ["a", "selected"],
  FILTERS: ["a", "data-type"],
  TODO_ITEMS: ".todo-list-item",
};

export const PATH = {
  TEAM: "/kanban.html",
};

export const getQueryId = () => {
  const params = new URLSearchParams(location.search);
  return params.get("id");
};
