import { addTeam } from "../../serverAPI/team/addTeam.js";
import { loadTeams } from "../../serverAPI/team/loadTeam.js";
import { drawTeam } from "./drawTeam.js";
import { deleteTeam } from "../../serverAPI/team/deleteTeam.js";

const teamContainer = document.querySelector("div.team-list-container");
const addTeamButton = document.querySelector("div.add-team-button-container");

export async function initTeams() {
  const teams = await loadTeams();
  for (const team of teams) {
    drawTeam(team);
  }

  initButtons();
}

function initButtons() {
  addTeamButton.addEventListener("click", onClickAddTeamButton);
  teamContainer.addEventListener("contextmenu", onRightClickTeamButtons);
}

function checkValidTeamName(name) {
  return name.trim().length > 0;
}

function isAddTeamButton(target) {
  return target.id === "add-team-button";
}

// div element에서 closest('div') 하면 자기 자신을 찾는 문제가 있음.
function isNormalButton(target) {
  return (
    target.closest("div") !== undefined &&
    target.parentNode.closest("div.team-card-container") !== null
  );
}

async function onClickAddTeamButton({ target }) {
  if (!target) return;
  if (!isAddTeamButton(target)) return;

  const newTeamName = prompt("Type new team's name.") ?? "";
  if (!checkValidTeamName(newTeamName)) {
    alert("Team name should be at least 1 character");
    return;
  }

  const addedTeam = await addTeam(newTeamName.trim());
  drawTeam(addedTeam);
}

async function onRightClickTeamButtons(event) {
  event.preventDefault();
  if (!event.target) return;
  if (isAddTeamButton(event.target) || !isNormalButton(event.target)) return;

  if (!confirm(`Remove team ${event.target.textContent.trim()}?`)) return;
  const teamID = event.target.parentNode.closest("div").id;
  deleteTeam(teamID);
  event.target.closest("div.team-card-container").remove();
}
