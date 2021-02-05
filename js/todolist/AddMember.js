import { API, MINIMUN_INPUT_LENGTH } from "../api.js";
import { getAllTodoList, teamId } from "./showTodoList.js";

const $addUserButton = document.querySelector("#add-user-button");

export const initAddMember = () => {
  $addUserButton.addEventListener("click", addNewMember);
};

const addNewMember = async () => {
  const result = prompt("새로운 팀원 이름을 입력해주세요");
  if (result === null) return;
  if (result.length < MINIMUN_INPUT_LENGTH) {
    alert(`${MINIMUN_INPUT_LENGTH} 글자 이상 입력해주세요!`);
    return;
  }
  await API.postMember(teamId, result);
  getAllTodoList();
};
