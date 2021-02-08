import {
  $todoAppContainer,
  $todoListItem,
  $appMemberAdd,
} from "../content/shape.js";
import { addMember, responseMemberApi } from "../server/AppServer.js";

const $domTodoAppListContainer = document.querySelector(
  ".todoapp-list-container"
);

function makeMemberList(teamName, count, value) {
  value.innerHTML += $todoAppContainer(teamName, count);
}

function addItem(item, index) {
  const $domTodoListItem = document.querySelectorAll(
    ".todoapp-container > .todoapp > .main > .todo-list"
  );
  $domTodoListItem[index].innerHTML += $todoListItem(item);
}

function makeAddList(value) {
  value.innerHTML += $appMemberAdd;
}

function addMemberEvent(teamId) {
  const $addTeamButton = document.querySelector("#add-user-button");
  $addTeamButton.addEventListener("click", () => addMemberEventHandler(teamId));
}

function addMemberEventHandler(teamId) {
  const result = prompt("팀 이름을 입력해주세요");
  if (/[\S]/gi.test(result)) {
    addMember(result, teamId);
    memberRender();
    let $domTodoAppListContainer = document.querySelector(
      ".todoapp-list-container"
    );
    setTimeout(() => responseMemberApi($domTodoAppListContainer, teamId), 500);
  } else alert("공백 혹은 정상적이지 않은 팀 이름 입력");
}

function memberRender() {
  const $domTeamListContainer = document.querySelector(
    ".todoapp-list-container"
  );
  const length = $domTeamListContainer.children.length;
  for (let i = 0; i < length; i++) {
    $domTeamListContainer.children[0].remove();
  }
}

export { makeMemberList, addItem, addMemberEvent, makeAddList };
