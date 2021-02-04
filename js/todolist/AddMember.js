import { API } from "../API.js";
import { MINIMUN_INPUT_LENGTH } from "../index.js";
import { getTeamList, teamId } from "./ShowTodoList.js"

const $addUserButton = document.querySelector("#add-user-button");

export const initAddMember = () => {
    $addUserButton.addEventListener("click", addNewMember);
}
  
  const addNewMember = async () => {
    const result = prompt("새로운 팀원 이름을 입력해주세요");
    if (result === null) return;
    if (result.length < MINIMUN_INPUT_LENGTH) {
      alert(`${MINIMUN_INPUT_LENGTH} 글자 이상 입력해주세요!`);
      return;
    }
    await API.postMember(teamId, result);
    getTeamList();
  };