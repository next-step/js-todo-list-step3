function countContainer(countContainer, count) {
  countContainer.querySelector(".todo-count > strong").innerHTML = count;
}

function initFilterEventListeners(filters, ulTag, todoCount) {
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

function clickEraseButton(name, teamId, memberId, itemId) {
  document.querySelectorAll(".destroy").forEach(($el) =>
    $el.addEventListener("click", (e) => {
      if ($el.closest("div").id === itemId);
      clickEraseHanlder(e, $el, name, teamId, memberId, itemId);
    })
  );
}

function clickEraseHanlder(event, $el, name, teamId, memberId, itemId) {
  event.target.closest("li").remove();
  document.querySelector(
    ".todo-count > strong"
  ).innerText = document.querySelector(".todo-list").childElementCount;
  getUserIdAndDeleteTodolist(teamId, memberId, itemId);
}

// 삭제버튼 클릭시 해당 TODOLIST의 item삭제하는 DELETE_TODOLIST함수 실행
function getUserIdAndDeleteTodolist(teamId, memberId, itemId) {
  fetch(
    `https://js-todo-list-9ca3a.df.r.appspot.com/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
    { method: "DELETE" }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export { countContainer, initFilterEventListeners, clickEraseButton };
