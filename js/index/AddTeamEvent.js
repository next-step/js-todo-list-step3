import { $indexTeam, $indexTeamAdd} from "../content/shape.js";
import {clickTeamEventHandler} from "../server/Server.js";

let id;
const $domTeamListContainer = document.querySelector('.team-list-container');

function addTeamEvent() {
  const $addTeamButton = document.querySelector('#add-team-button')
  $addTeamButton.addEventListener('click', addTeamEventHandler )
}

function addTeamEventHandler(){
    const result = prompt('팀 이름을 입력해주세요')
}

function makeTeamTitle(teamName) {
  $domTeamListContainer.innerHTML += $indexTeam(teamName);
}

function teamAddTitle(){
  $domTeamListContainer.innerHTML += $indexTeamAdd;
}



export {addTeamEvent,makeTeamTitle,teamAddTitle,id}
