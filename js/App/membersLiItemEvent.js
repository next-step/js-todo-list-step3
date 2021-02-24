import {
  getUserIdAndDeleteTodolist,
  putServerIsCompleted,
  addMemberItem,
  contentsModify,
  priorityNoneModify,
  priorityFirstModify,
  prioritySecondModify,
} from "../server/AppServer.js";
import { $label, baseUrl } from "../content/shape.js";

//핸들러를 추가할 진짜 liTag(realLiTag)에 핸들러를 추가해준다. (다른 아래 내용도 마찬가지)
function clickEraseButton(todoApp, name, teamId, memberId, itemId) {
  const liAll = todoApp.querySelectorAll(
    ".main > .todo-list > .todo-list-item"
  );
  const realLiTag = liAll[liAll.length - 1];
  const realDestory = realLiTag.querySelector(".view > .destroy");
  realDestory.addEventListener("click", (e) => {
    clickEraseHanlder(todoApp, e, teamId, memberId, itemId);
  });
}

function clickEraseHanlder(todoApp, event, teamId, memberId, itemId) {
  event.target.closest("li").remove();
  getUserIdAndDeleteTodolist(todoApp, teamId, memberId, itemId);
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
    clickEnter(e, newTodo, ulTag, teamId, memberId)
  );
}

function clickEnter(event, newTodo, ulTag, teamId, memberId) {
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

function checkPriority(ulTag, isPriority, teamId, memberId, itemId) {
  const chipAll = ulTag.querySelectorAll(
    ".todo-list-item > .view >.label >.chip-container >.chip"
  );
  const realChipTag = chipAll[chipAll.length - 1];
  if (isPriority === "FIRST") {
    realChipTag.children[1].setAttribute("selected", "");
  } else if (isPriority === "SECOND") {
    realChipTag.children[2].setAttribute("selected", "");
  }
  realChipTag.addEventListener("click", () =>
    clickChipTag(realChipTag, teamId, memberId, itemId)
  );
}
function clickChipTag(realChipTag, teamId, memberId, itemId) {
  let selectValue = realChipTag.options[realChipTag.selectedIndex].value;
  if (selectValue == 0) {
    priorityNoneModify(teamId, memberId, itemId);
  } else if (selectValue == 1) {
    priorityFirstModify(teamId, memberId, itemId);
  } else if (selectValue == 2) {
    prioritySecondModify(teamId, memberId, itemId);
  }
}

export {
  clickEraseButton,
  clickInput,
  clickCheckboxButton,
  clickLabel,
  checkPriority,
};
