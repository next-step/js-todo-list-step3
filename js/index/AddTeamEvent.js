import { $indexTeam, $indexTeamAdd} from "../content/shape.js";
import {clickTeamEventHandler} from "../server/Server.js";

const $domTeamListContainer = document.querySelector('.team-list-container');

function addTeamEvent() {
  const $addTeamButton = document.querySelector('#add-team-button')
  $addTeamButton.addEventListener('click', addTeamEventHandler )
}

function addTeamEventHandler(){
    const result = prompt('팀 이름을 입력해주세요')
}

function makeTeamTitle(teamName,teamId) {
  $domTeamListContainer.innerHTML += $indexTeam(teamName,teamId);
}

function teamAddTitle(){
  $domTeamListContainer.innerHTML += $indexTeamAdd;
}

export {addTeamEvent,makeTeamTitle,teamAddTitle}
