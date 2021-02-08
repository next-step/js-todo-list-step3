import { $baseUrl } from "../content/shape.js";
import {
  addTeamEvent,
  makeTeamTitle,
  makeTeamCardContainer,
} from "../index/AddTeamEvent.js";

function responseTeamApi() {
  fetch(`${$baseUrl}api/teams`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((teamArray) => {
        makeTeamTitle(teamArray.name, teamArray._id);
      });
      makeTeamCardContainer();
      addTeamEvent();
    });
}

function addTeam(teamName) {
  fetch(`${$baseUrl}api/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `${teamName}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(() => "오류 발생");
}

function getTeamId(teamName) {
  fetch(`${$baseUrl}api/teams`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((tN) => {
        //모든 팀 이름들 중 해당하는 팀 이름이 있는 곳이면
        if (tN.name === teamName) {
          teamRender();
          responseTeamApi();
        }
      });
    })
    .catch(() => "오류 발생");
}

function teamRender() {
  const $domTeamListContainer = document.querySelector(".team-list-container");
  const length = $domTeamListContainer.children.length;
  for (let i = 0; i < length; i++) {
    $domTeamListContainer.children[0].remove();
  }
}

export { responseTeamApi, addTeam, getTeamId };
