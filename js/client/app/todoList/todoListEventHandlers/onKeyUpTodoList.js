export function onKeyUpTodoList({ target, key }) {
  if (target.nodeName !== "INPUT" || !target.classList.contains("edit")) return;

  if (key === "Escape") {
    target.closest("li.todo-list-item").classList.toggle("editing");
  }
}
