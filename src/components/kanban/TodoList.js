import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

import TodoListItem from "./TodoListItem.js";

export default function TodoList({ _id }) {
  const dom = createElement("<div></div>");

  const init = async () => {
    $store.todo.subscribe(_id, render);
    await render();
  };

  const render = async () => {
    const todos = await $store.todo.getFiltered(_id);

    dom.innerHTML = "";
    todos?.forEach(renderEachTodo);
  };

  const renderEachTodo = (todo) => {
    const todoListItem = TodoListItem({ memberId: _id, todo });
    dom.appendChild(todoListItem);
  };

  init();

  return dom;
}
