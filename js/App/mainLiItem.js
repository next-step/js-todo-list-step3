import {
  getUserIdAndDeleteTodolist,
  putServerIsCompleted,
  addMemberItem,
  responseMemberApi,
  contentsModify,
} from "../server/AppServer.js";
import { $todoListItem, $label } from "../content/shape.js";
import { countContainer } from "./todoAppCountContainer.js";

function clickEraseButton(name, teamId, memberId, itemId) {
  document.querySelectorAll(".destroy").forEach(($el) =>
    $el.addEventListener("click", (e) => {
      clickEraseHanlder(e, teamId, memberId, itemId);
    })
  );
}

function clickEraseHanlder(event, teamId, memberId, itemId) {
  event.target.closest("li").remove();
  document.querySelector(
    ".todo-count > strong"
  ).innerText = document.querySelector(".todo-list").childElementCount;
  getUserIdAndDeleteTodolist(teamId, memberId, itemId);
}

function clickCheckboxButton(todoApp, teamId, memberId, itemId) {
  const liAll = todoApp.querySelectorAll(
    ".main > .todo-list > .todo-list-item"
  );
  const realLiTag = liAll[liAll.length - 1];
  const realCheckBox = realLiTag.querySelector(".view > .toggle");
  realCheckBox.addEventListener("click", (e) => {
    clickCheckboxHandler(e, teamId, memberId, itemId);
  });
}

function clickCheckboxHandler({ target }, teamId, memberId, itemId) {
  let $liTarget = target.closest("li");
  if (target.checked === true) {
    $liTarget.classList.add("completed");
    $liTarget.classList.remove("active");
    putServerIsCompleted(teamId, memberId, itemId, target.checked);
  } else {
    $liTarget.classList.add("active");
    $liTarget.classList.remove("completed");
    putServerIsCompleted(teamId, memberId, itemId, target.checked);
  }
}

function clickInput(todoApp, ulTag, teamId, memberId) {
  let newTodo = todoApp.querySelector(".input-container > .new-todo");
  newTodo.addEventListener("keyup", (e) =>
    clickEnter(e, newTodo, ulTag, teamId, memberId, todoApp)
  );
}

function clickEnter(event, newTodo, ulTag, teamId, memberId, todoApp) {
  if (event.key === "Enter" && /[\S]/gi.test(newTodo.value) !== true) {
    alert("공백을 입력했습니다.");
  } else if (event.key === "Enter" && /[\S]/gi.test(newTodo.value) == true) {
    {
      addMemberItem(newTodo.value, teamId, memberId);
    }
    //입력한 할일 추가시 할일 공백으로 만들기
    newTodo.value = "";
  }
}

function clickLabel(todoApp, teamId, memberId, itemId) {
  const liAll = todoApp.querySelectorAll(
    ".main > .todo-list > .todo-list-item"
  );
  const realLiTag = liAll[liAll.length - 1];
  const realLabel = realLiTag.querySelector(".view > .label");
  const realEdit = realLiTag.querySelector(".edit");
  realLabel.addEventListener("dblclick", (e) => {
    clickLabelHandler(e, realEdit, teamId, memberId, itemId);
  });
}

function clickLabelHandler(event, realEdit, teamId, memberId, itemId) {
  let liClass = event.target.closest("li").getAttribute("class");
  event.target.closest("li").setAttribute("class", "editing");
  realEdit.addEventListener("keydown", (e) => {
    keydownCheck(e, event, realEdit, liClass, teamId, memberId, itemId);
  });
}

function keydownCheck(e, event, realEdit, liClass, teamId, memberId, itemId) {
  if (e.key === "Enter" && /[\S]/gi.test(realEdit.value) == true) {
    event.target.closest("label").innerHTML = $label(realEdit.value);
    event.target.closest("li").setAttribute("class", "active");
    event.target.closest("div").children[0].removeAttribute("checked");
    contentsModify(realEdit.value, teamId, memberId, itemId);
  } else if (e.key === "Escape") {
    event.target.closest("li").setAttribute("class", liClass); //기존의 class로 바꾸기
  } else if (e.key === "Enter" && /[\S]/gi.test(realEdit.value) == false) {
    alert("공백 입력 금지");
  }
}

export { clickEraseButton, clickInput, clickCheckboxButton, clickLabel };
