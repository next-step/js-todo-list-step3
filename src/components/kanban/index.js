import { createElement } from "../../utils/createElement.js";

const template = `
  <div>
    <h1 id="user-title" data-username="eastjun">
      <span><strong>Team</strong>'s Todo List</span>
    </h1>
    <ul class="todoapp-list-container flex-column-container">
      <li class="todoapp-container">
        <h2>
          <span><strong>eastjun</strong>'s Todo List</span>
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
      <li class="add-user-button-container">
        <button id="add-user-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </li>
    </ul>
  </div>
`;

export default function Kanban() {
  const dom = createElement(template);

  return dom;
}
