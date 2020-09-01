import { createUniqueID } from "./util.js";

export const CURRENT_USER_ID = "user-title";
export const TODO_LIST_ID = "todo-list";
export const TODO_INPUT_ID = "new-todo";
export const TODO_COUNT_ID = "todo-count";
export const TODO_FILTER_ID = "filters";
export const USERS_ID = "user-list";
export const TODOS = "todoList";
export const ALL = "";
export const COMPLETED = "completed";
export const ACTIVE = "active";
export const SELECTED = "selected";
export const TOGGLE = "toggle";
export const EDIT = "edit";
export const EDITING = "editing";
export const ESC = "Escape";
export const ENTER = "Enter";
export const KEYDOWN = "keydown";
export const USER = "eastjun";
export const NOTLI = "notLI";
export const APP_ID = "app";
export const TEAM_TITLE_ID = "user-title";
export const TEAM_LIST_ID = "team-list-container";
export const TEAM_CARD_ID = "team-card-container";
export const ADD_TEAM_BTN_ID = "add-team-button";
export const ADD_TEAM_BTN_CONTAINER_ID = "add-team-button-container";
export const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com";
export const goalList = [
  {
    id: `${createUniqueID()}0`,
    content: "JS 복습하기",
    isCompleted: false,
  },
  {
    id: `${createUniqueID()}1`,
    content: "JS 예습하기",
    isCompleted: false,
  },
  {
    id: `${createUniqueID()}2`,
    content: "BlackCoffee 과제하기",
    isCompleted: false,
  },
];
