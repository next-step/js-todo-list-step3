import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

import TodoListItem from "./TodoListItem.js";

export default function TodoList({ memberId }) {
  const dom = createElement("<div></div>");

  const init = async () => {
    $store.todo.subscribe(memberId, render);
    await render();
  };

  const render = async () => {
    const todos = await $store.todo.getFiltered(memberId);

    dom.innerHTML = "";
    todos?.forEach(renderEachTodo);
  };

  const renderEachTodo = (todo) => {
    const todoListItem = TodoListItem({ memberId: memberId, todo });
    dom.appendChild(todoListItem);
  };

  init();

  return dom;
}
