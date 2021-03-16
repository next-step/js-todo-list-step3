export function updateCountText(userID) {
  /**
   * Call this function AFTER filter is applied.
   */
  const userLI = document.getElementById(userID);
  const todos = userLI.querySelector("section.main ul.todo-list").children;
  const countText = userLI.querySelector(
    "div.count-container span.todo-count strong"
  );

  let count = 0;
  for (let index = 0; index < todos.length; index++) {
    if (todos.item(index).style.display !== "none") count++;
  }
  countText.textContent = count;
}
