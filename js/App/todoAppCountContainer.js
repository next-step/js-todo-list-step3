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

export { countContainer, initFilterEventListeners };
