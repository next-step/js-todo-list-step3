export function onDoubleClickTodoList({ target }) {
  if (target.nodeName !== "LABEL") return;
  const todo = target.closest("li.todo-list-item");
  todo.classList.toggle("editing");
}
