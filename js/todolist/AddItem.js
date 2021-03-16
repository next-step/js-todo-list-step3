import { API } from "../api.js";
import { isEnterKey , isEnoughLength } from "../validator.js"
import { $todoApps, teamId } from "./TodoList_DOM.js"
import { getAllTodoList } from "./showTodoList.js";

const addNewItem = async ({ target, key }) => {
  if (!target.classList.contains("new-todo")) return;
  if (!isEnterKey(key)) return;
  const str = target.value;
  target.value = "";
  if (isEnoughLength(str)) return;
  const memberId = target.closest("li").id;

  await API.postItem(teamId, memberId, str);
  getAllTodoList();
};

export const initAddTodoList = () => {
  $todoApps.addEventListener("keyup", addNewItem);
};
