import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoFilter from "./TodoFilter.js";
import TodoCount from "./TodoCount.js";

const template = `
  <li class="todoapp-container">
    <h2>
      <span><strong class="member-name">Member</strong>'s Todo List</span>
    </h2>
    <div class="todoapp">
      <section class="input-container">
      </section>
      <section class="main">
        <ul class="todo-list">
        </ul>
      </section>
      <div class="count-container">
        <span class="todo-count"></span>
        <span class="todo-filter"></span>
        <button class="clear-todos-button">모두 삭제</button>
      </div>
    </div>
  </li>
`;

export default function TodoContainer({ member }) {
  const dom = createElement(template);
  const memberName = dom.querySelector(".member-name");
  const input = dom.querySelector(".input-container");
  const todoList = dom.querySelector(".todo-list");
  const filter = dom.querySelector(".todo-filter");
  const counter = dom.querySelector(".todo-count");
  const deleteAllTodoBtn = dom.querySelector(".clear-todos-button");

  const init = () => {
    deleteAllTodoBtn.addEventListener("click", deleteAllTodo);
    render();
  };

  const render = () => {
    const { _id: memberId } = member;

    memberName.innerText = member.name;
    input.appendChild(TodoInput({ memberId }));
    todoList.appendChild(TodoList({ memberId }));
    filter.appendChild(TodoFilter({ memberId }));
    counter.appendChild(TodoCount({ memberId }));
  };

  const deleteAllTodo = async () => {
    try {
      await $store.todo.deleteAll(member._id);
    } catch (e) {
      console.error(e);
    }
  };

  init();

  return dom;
}
