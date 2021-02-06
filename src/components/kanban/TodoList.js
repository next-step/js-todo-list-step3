import { createElement } from "../../utils/createElement.js";

import TodoListItem from "./TodoListItem.js";

export default function TodoList({ todos }) {
  const dom = createElement("<div></div>");

  const init = async () => {
    await render();
  };

  const render = async () => {
    dom.innerHTML = "";
    todos.forEach(renderEachTodo);
  };

  const renderEachTodo = (todo) => {
    const todoListItem = TodoListItem({ todo });
    dom.appendChild(todoListItem);
  };

  init();

  return dom;
}
