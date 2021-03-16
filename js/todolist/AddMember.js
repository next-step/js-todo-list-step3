import { API } from "../api.js";
import { isCanceled, isEnoughLength } from "../validator.js"
import { teamId } from "./TodoList_DOM.js"
import { getAllTodoList } from "./showTodoList.js";

const addNewMember = async () => {
  const result = prompt("새로운 팀원 이름을 입력해주세요");
  if (result === null) return;
  if (isCanceled(result)) return;
  if (isEnoughLength(result)) return;
  await API.postMember(teamId, result);
  getAllTodoList();
};

export const initAddMember = () => {
  const $addUserButton = document.querySelector("#add-user-button");
  $addUserButton.addEventListener("click", addNewMember);
};