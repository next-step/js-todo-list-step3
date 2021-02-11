import {
  getUserIdAndDeleteTodolist,
  putServerIsCompleted,
} from "../server/AppServer.js";

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

function clickInput(todoApp, teamId, memberId) {
  let newTodo = todoApp.querySelector(".input-container > .new-todo");
  newTodo.addEventListener("keyup", (e) =>
    clickEnter(e, newTodo, teamId, memberId, todoApp)
  );
}

function clickEnter(event, newTodo, teamId, memberId, todoApp) {
  if (event.key === "Enter" && /[\S]/gi.test(newTodo.value) !== true) {
    alert("공백을 입력했습니다.");
  } else if (event.key === "Enter" && /[\S]/gi.test(newTodo.value) == true) {
    {
    }
    //입력한 할일 추가시 할일 공백으로 만들기
    newTodo.value = "";
  }
}

export { clickEraseButton, clickInput, clickCheckboxButton };
