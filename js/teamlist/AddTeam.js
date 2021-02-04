import { API, MINIMUN_INPUT_LENGTH } from "../api.js";
import { getAllTeams } from "./showTeamList.js";

const $addTeamButton = document.querySelector("#add-team-button");

export const initAddTeam = () => {
  $addTeamButton.addEventListener("click", addNewTeam);
};

const addNewTeam = async () => {
  const result = prompt("팀 이름을 입력해주세요");
  if (result === null) return;
  if (result.length < MINIMUN_INPUT_LENGTH) {
    alert(`${MINIMUN_INPUT_LENGTH} 글자 이상 입력해주세요!`);
    return;
  }
  await API.postTeam(result);

  getAllTeams();
};
