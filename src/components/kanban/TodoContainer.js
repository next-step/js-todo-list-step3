import { createElement } from "../../utils/createElement.js";

import TodoList from "./TodoList.js";

const template = `
  <li class="todoapp-container">
    <h2>
      <span><strong class="member-name">Member</strong>'s Todo List</span>
    </h2>
    <div class="todoapp">
      <section class="input-container">
        <input
          class="new-todo"
          placeholder="할 일을 입력해주세요."
          autofocus
        />
      </section>
      <section class="main">
        <ul class="todo-list">
        </ul>
      </section>
      <div class="count-container">
        <span class="todo-count">총 <strong>0</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="#all" class="selected">전체보기</a>
          </li>
          <li>
            <a href="#priority">우선 순위</a>
          </li>
          <li>
            <a href="#active">해야할 일</a>
          </li>
          <li>
            <a href="#completed">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>
    </div>
  </li>
`;

export default function TodoContainer({ member }) {
  const dom = createElement(template);
  const memberName = dom.querySelector(".member-name");
  const todoList = dom.querySelector(".todo-list");

  const init = () => {
    render();
  };

  const render = () => {
    memberName.innerText = member.name;
    todoList.appendChild(new TodoList({ todos: member.todoList }));
  };

  init();

  return dom;
}