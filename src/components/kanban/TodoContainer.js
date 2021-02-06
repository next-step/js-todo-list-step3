import { createElement } from "../../utils/createElement.js";

import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoFilter from "./TodoFilter.js";

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
        <span class="todo-count">총 <strong>0</strong> 개</span>
        <span class="todo-filter"></span>
        <button class="clear-completed">모두 삭제</button>
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

  const init = () => {
    render();
  };

  const render = () => {
    const { _id: memberId } = member;

    memberName.innerText = member.name;
    input.appendChild(new TodoInput({ memberId }));
    todoList.appendChild(new TodoList({ memberId }));
    filter.appendChild(new TodoFilter({ memberId }));
  };

  init();

  return dom;
}
