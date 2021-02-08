import {
  makeMemberList,
  addItem,
  makeAddList,
  addMemberEvent,
} from "../App/AddMemberEvent.js";
import { $baseUrl, kanbanHeader } from "../content/shape.js";

let $domTodoAppListContainer;
function getTeamNameAndTodoList($teamId) {
  fetch(`${$baseUrl}api/teams`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((team) => {
        if (team._id === $teamId) {
          document.body.innerHTML += kanbanHeader(team.name);
        }
      });
    })
    .then(() => {
      $domTodoAppListContainer = document.querySelector(
        ".todoapp-list-container"
      );
      responseMemberApi($domTodoAppListContainer, $teamId);
    });
}

let count = -1;
function responseMemberApi(value, teamId) {
  fetch(`${$baseUrl}api/teams/${teamId}`)
    .then((response) => response.json())
    .then((data) => {
      data.members.forEach((arr) => {
        makeMemberList(arr.name, 0, value);
        arr.todoList.forEach((arr, index) => {
          //새로운 멤버의 할일로 바뀐다면
          if (index == 0) {
            count++;
          }
          addItem(arr.contents, count);
          document.querySelectorAll(".todo-count > strong")[count].innerHTML =
            index + 1;
        });
      });
      makeAddList(value);
      addMemberEvent(teamId);
    });
}

function addMember(teamName, teamId) {
  fetch(`${$baseUrl}api/teams/${teamId}/members`, {
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

export { responseMemberApi, addMember, getTeamNameAndTodoList };
