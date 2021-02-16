import {
  loadMemberList,
  makeAddList,
  addMemberEvent,
  memberRender,
} from "../App/AddMemberEvent.js";
import { baseUrl, $kanbanHeader } from "../content/shape.js";
import { todoCountMinus } from "../App/todoAppCountContainer.js";
import { requestOption } from "../content/requestOption.js";

let $domTodoAppListContainer;

function responseMemberApi(teamId) {
  fetch(`${baseUrl}${teamId}`)
    .then((response) => response.json())
    .then((data) => {
      document.body.innerHTML += $kanbanHeader(data.name);
      $domTodoAppListContainer = document.querySelector(
        ".todoapp-list-container"
      );
      makeAddList($domTodoAppListContainer);
      addMemberEvent(teamId);
      let but = document.querySelector(".add-user-button-container");
      data.members.forEach((arr) => {
        loadMemberList(arr.name, but, arr.todoList, teamId, arr._id);
      });
    });
}

function addMember(teamName, teamId) {
  fetch(`${baseUrl}${teamId}/members`, requestOption.addMember(teamName))
    .then(() => memberRender())
    .then(() => responseMemberApi(teamId))
    .catch(() => "오류 발생");
}

// 삭제버튼 클릭시 해당 TODOLIST의 item삭제하는 DELETE_TODOLIST함수 실행
function getUserIdAndDeleteTodolist(todoApp, teamId, memberId, itemId) {
  fetch(
    `${baseUrl}${teamId}/members/${memberId}/items/${itemId}`,
    requestOption.delete()
  )
    .then((response) => response.json())
    .then((data) => {
      todoCountMinus(todoApp);
    });
}

function putServerIsCompleted(teamId, memberId, itemId, IsCompleted) {
  fetch(
    `${baseUrl}${teamId}/members/${memberId}/items/${itemId}/toggle`,
    requestOption.completed(IsCompleted)
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function addMemberItem(value, teamId, memberId) {
  fetch(
    `${baseUrl}${teamId}/members/${memberId}/items`,
    requestOption.addMemberItem(value)
  )
    .then((response) => response.json())
    .then(() => {
      //전부 렌더링
      responseMemberApi(teamId);
    });
}

function eraseMemberTodoList(todoApp, teamId, memberId) {
  fetch(`${baseUrl}${teamId}/members/${memberId}/items`, requestOption.delete())
    .then((response) => response.json())
    .then((data) => todoCountMinus(todoApp))
    .catch((data) => console.log(data));
}

function contentsModify(value, teamId, memberId, itemId) {
  fetch(
    `${baseUrl}${teamId}/members/${memberId}/items/${itemId}`,
    requestOption.contentsModify(value)
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((data) => console.log(data));
}

function priorityNoneModify(teamId, memberId, itemId) {
  fetch(
    `${baseUrl}${teamId}/members/${memberId}/items/${itemId}/priority`,
    requestOption.priorityNone()
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function priorityFirstModify(teamId, memberId, itemId) {
  fetch(
    `${baseUrl}${teamId}/members/${memberId}/items/${itemId}/priority`,
    requestOption.priorityFirst()
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function prioritySecondModify(teamId, memberId, itemId) {
  fetch(
    `${baseUrl}${teamId}/members/${memberId}/items/${itemId}/priority`,
    requestOption.prioritySecond()
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export {
  addMember,
  responseMemberApi,
  getUserIdAndDeleteTodolist,
  putServerIsCompleted,
  addMemberItem,
  eraseMemberTodoList,
  contentsModify,
  priorityNoneModify,
  priorityFirstModify,
  prioritySecondModify,
};
