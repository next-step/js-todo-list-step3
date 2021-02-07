import { $indexTeam, $indexTeamAdd} from "../content/shape.js";
import {addTeam, getTeamId} from "../server/indexServer.js";

const $domTeamListContainer = document.querySelector('.team-list-container');

function makeTeamTitle(teamName,teamId) {
  $domTeamListContainer.innerHTML += $indexTeam(teamName,teamId);
}

function makeTeamCardContainer(){
  $domTeamListContainer.innerHTML += $indexTeamAdd;
}

function addTeamEvent() {
  const $addTeamButton = document.querySelector('#add-team-button')
  $addTeamButton.addEventListener('click', addTeamEventHandler )
}

function addTeamEventHandler(){
  const result = prompt('팀 이름을 입력해주세요');
  if(/[\S]/gi.test(result)) {
    addTeam(result);
    getTeamId(result);
  }
  else
    alert('공백 혹은 정상적이지 않은 팀 이름 입력')
}

export {addTeamEvent,makeTeamTitle,makeTeamCardContainer}
