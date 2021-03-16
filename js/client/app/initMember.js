import { loadTeam } from "../../serverAPI/team/loadTeam.js";
import { addMember } from "../../serverAPI/user/addMember.js";
import { drawMember } from "./drawMember.js";

export async function initMember() {
  const teamID = location.hash.split("#")[1];
  const members = await loadTeam(teamID);

  if (members._id !== teamID) {
    alert("operation not successful(team id mismatch).");
  }

  initHeader(members.name);

  for (const member of members.members) {
    drawMember(member);
  }

  initAddMemberButton();
  localStorage.setItem("teamID", teamID);
}

function initAddMemberButton() {
  document
    .getElementById("add-user-button")
    .addEventListener("click", onClickAddMemberButton);
}

async function onClickAddMemberButton({ target }) {
  const userName = prompt("Please enter user name.");
  if (userName === null || userName.trim().length < 1) {
    alert("Please enter at leaest 1 character.");
    return;
  }

  const teamID = localStorage.getItem("teamID");
  const updatedTeam = await addMember(teamID, userName);
  drawMember(updatedTeam.members[updatedTeam.members.length - 1]);
}

function initHeader(teamName) {
  document.querySelector("h1#user-title strong").textContent = teamName;
}
