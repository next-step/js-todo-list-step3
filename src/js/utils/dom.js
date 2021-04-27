export const $ = (selector, target = document) =>
  target.querySelector(selector);
export const DEFAULT_SELECTOR = {
  ID: "#",
  CLASS: ".",
};

export const TEAM_SELECTOR = {
  TEAM_LIST: ".team-list-container",
  TEAM_ADD_BUTTON_CONTAINER: ".add-team-button-container",
  TEAM_ADD_BUTTON: "#add-team-button",
};

export const MEMBER_SELECTOR = {
  ADD_BUTTON: "#add-user-button",
};

export const PATH = {
  TEAM: "/kanban.html",
};

export const getQueryId = () => {
  const params = new URLSearchParams(location.search);
  return params.get("id");
};
