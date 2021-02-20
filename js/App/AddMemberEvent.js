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
  clickLabel,
  checkPriority,
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
  } else alert("공백 혹은 정상적이지 않은 팀 이름 입력");
}

//member별 item
function loadMemberList(teamMember, button, todoList, teamId, memberId) {
  button.insertAdjacentHTML("beforebegin", $todoAppContainer(teamMember));
  const memberNameArr = document.querySelectorAll(
    ".todoapp-container > h2 > span > strong"
  );
  const ulTodolist = document.querySelectorAll(".todo-list");
  //각각의 '~'의 todoList의 '~'와 서버에서 가져온 '~'가 같으면 실행
  memberNameArr.forEach((memberName, index) => {
    if (memberName.innerHTML === teamMember) {
      loadItem(todoList, ulTodolist[index], memberName, teamId, memberId);
    }
  });
}

function loadItem(todoList, ulTag, memberName, teamId, memberId) {
  let todoApp = ulTag.closest("div");
  //멤버당 할일 갯수만큼 반복
  todoList.forEach((todoListArray) => {
    ulTag.insertAdjacentHTML(
      "beforeend",
      $todoListItem(todoListArray.contents, todoListArray.isCompleted)
    );
    checkPriority(
      ulTag,
      todoListArray.priority,
      teamId,
      memberId,
      todoListArray._id
    );
    countContainer(
      todoApp.querySelector(".count-container"),
      ulTag.childElementCount
    );
    clickEraseButton(todoApp, memberName, teamId, memberId, todoListArray._id);
    clickCheckboxButton(todoApp, teamId, memberId, todoListArray._id);
    clickLabel(todoApp, teamId, memberId, todoListArray._id);
  });
  //멤버당 한번씩 반복
  clickInput(todoApp, ulTag, teamId, memberId);
  initFilterEventListeners(
    todoApp,
    todoApp.querySelector(".count-container > .filters"),
    todoApp.querySelector(".count-container > .clear-completed"),
    ulTag,
    todoApp.querySelector(".count-container > .todo-count >strong"),
    teamId,
    memberId
  );
}

export { loadMemberList, loadItem, addMemberEvent, makeAddList };
