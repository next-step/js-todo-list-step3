import { eraseMemberTodoList } from "../server/AppServer.js";

function countContainer(countContainer, count) {
  countContainer.querySelector(".todo-count > strong").innerHTML = count;
}

function initFilterEventListeners(
  todoApp,
  filters,
  eraseButton,
  ulTag,
  todoCount,
  teamId,
  memberId
) {
  filters
    .querySelector(" .all")
    .addEventListener("click", () => onAllFilterHandler(ulTag, todoCount));
  filters
    .querySelector(".active")
    .addEventListener("click", () => onActiveFilterHandler(ulTag, todoCount));
  filters
    .querySelector(" .completed")
    .addEventListener("click", () =>
      onCompletedFilterHandler(ulTag, todoCount)
    );
  eraseButton.addEventListener("click", () =>
    onEraseButtonHandler(todoApp, eraseButton, teamId, memberId, ulTag)
  );
}

function onAllFilterHandler(ulTag, todoCount) {
  ulTag.querySelectorAll("li").forEach((x) => {
    x.style.display = "";
  });
  todoCount.innerHTML = ulTag.childElementCount;
}

function onActiveFilterHandler(ulTag, todoCount) {
  ulTag
    .querySelectorAll("li")
    .forEach(
      (x) => (x.style.display = x.classList.contains("active") ? "" : "none")
    );
  let count = 0;
  ulTag.querySelectorAll("li").forEach((x) => {
    if (x.classList.contains("active")) count++;
  });
  todoCount.innerHTML = count;
}

function onCompletedFilterHandler(ulTag, todoCount) {
  ulTag
    .querySelectorAll("li")
    .forEach((x) =>
      x.classList.contains("completed") == true
        ? (x.style.display = "")
        : (x.style.display = "none")
    );
  let count = 0;
  ulTag.querySelectorAll("li").forEach((x) => {
    if (x.classList.contains("completed")) count++;
  });
  todoCount.innerHTML = count;
}

function onEraseButtonHandler(todoApp, eraseButton, teamId, memberId, ulTag) {
  if (confirm("지우시겠습니까?")) {
    eraseAllLiTag(ulTag);
    eraseMemberTodoList(todoApp, teamId, memberId);
  } else {
    alert("멤버 지우기 취소");
  }
}

function eraseAllLiTag(ulTag) {
  let allLi = ulTag.querySelectorAll("li");
  allLi.forEach((li) => li.remove());
}

function todoCountMinus(todoApp) {
  todoApp.querySelector(
    ".count-container>.todo-count > strong"
  ).innerText = todoApp.querySelector(".main > .todo-list").childElementCount;
}

export { countContainer, initFilterEventListeners, todoCountMinus };
