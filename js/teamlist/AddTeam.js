import { API } from "../api.js";
import { isCanceled, isEnoughLength } from "../validator.js"
import { getAllTeamsList } from "./showTeamList.js";

const addNewTeam = async () => {
  const result = prompt("팀 이름을 입력해주세요");
  if (isCanceled(result)) return;
  if (isEnoughLength(result)) return;

  await API.postTeam(result);

  getAllTeamsList();
};

export const initAddTeam = () => {
  const $addTeamButton = document.querySelector("#add-team-button");
  $addTeamButton.addEventListener("click", addNewTeam);
};


