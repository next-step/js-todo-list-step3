import {
  $todoAppContainer,
  $todoListItem,
  $appMemberAdd,
} from "../content/shape.js";
import { addMember, responseMemberApi } from "../server/AppServer.js";
import {
  countContainer,
  initFilterEventListeners,
} from "./todoAppCountContainer.js";

import {
  clickEraseButton,
  clickInput,
  clickCheckboxButton,
} from "./mainLiItem.js";

//member add  관련
function makeAddList(value) {
  value.innerHTML = $appMemberAdd;
}

function addMemberEvent(teamId) {
  const $addTeamButton = document.querySelector("#add-user-button");
  $addTeamButton.addEventListener("click", () => addMemberEventHandler(teamId));
}

async function addMemberEventHandler(teamId) {
  const result = prompt("팀 이름을 입력해주세요");
  if (/[\S]/gi.test(result) && result !== null) {
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

//member별 item
function loadMemberList(teamMember, button, todoList, teamId, memberId) {
  button.insertAdjacentHTML("beforebegin", $todoAppContainer(teamMember));
  let memberNameArr = document.querySelectorAll(
    ".todoapp-container > h2 > span > strong"
  );
  let ulTodolist = document.querySelectorAll(".todo-list");
  memberNameArr.forEach((memberName, index) => {
    if (memberName.innerHTML === teamMember) {
      loadItem(todoList, ulTodolist[index], memberName, teamId, memberId);
    }
  });
}

function loadItem(todoList, ulTag, memberName, teamId, memberId) {
  let todoApp = ulTag.closest("div");
  todoList.forEach((x) => {
    ulTag.insertAdjacentHTML(
      "beforeend",
      $todoListItem(x.contents, x.isCompleted)
    );
    countContainer(
      todoApp.querySelector(".count-container"),
      ulTag.childElementCount
    );
    clickEraseButton(memberName, teamId, memberId, x._id);
    clickCheckboxButton(todoApp, teamId, memberId, x._id);
  });
  clickInput(todoApp, ulTag, teamId, memberId);
  initFilterEventListeners(
    todoApp.querySelector(".count-container > .filters"),
    ulTag,
    todoApp.querySelector(".count-container > .todo-count >strong")
  );
}

export { loadMemberList, loadItem, addMemberEvent, makeAddList };
