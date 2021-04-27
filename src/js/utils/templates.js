import { CLASSNAMES, PRIORITY } from "./constant.js";

export const teamListView = (data = []) => {
  const list = data.map((element) => teamCardView(element._id, element.name));
  list.push(teamAddBtnView);
  return list.join("");
};

const teamCardView = (id, name) => `
<div class="team-card-container" dataset-id=${id}>
<a href="/kanban.html?id=${id}" class="card">
  <div class="card-title">
    ${name}
  </div>
</a>
</div>
`;

const teamAddBtnView = `
<button id="add-team-button" class="ripple">
  <span class="material-icons">add</span>
</button>`;

export const todoListView = (member) => `
  <li class="todoapp-container" dataset-set=${member._id}>
    ${MemberTitleView(member.name)}
    <div class="todoapp">
    ${todoInputView}
    <section class="main">
      <ul class="todo-list">
        ${member.todoList
          .filter((todo) => !!todo)
          .map((todo) => todoItemView(todo))
          .join("")}
      </ul>
    </section>
    <div class="count-container">
    ${todoCountView(member.todoList.length)}
    ${todoFilterView}
    ${clearBtnView}
    </div>
    </div>
  </li>
`;

export const teamTitleView = (title) =>
  `<span><strong>${title}</strong>'s Todo List</span>`;

export const MemberTitleView = (name) =>
  `
<h2>
  <span><strong>${name}</strong>'s Todo List</span>
</h2>
`;

const todoCountView = (count) =>
  `<span class="todo-count">총 <strong>${count}</strong> 개</span>`;

const todoItemView = (todo) => {
  return `
  <li id=${todo._id} class="todo-list-item ${
    todo.isCompleted ? CLASSNAMES.COMPLETED : ""
  }">
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.isCompleted && "checked"}/>
      <label class="label">
        <div class="chip-container">
          <select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        </div>
        ${todo.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todo.contents}" />
  </li>
`;
};

const todoInputView = `
<section class="input-container">
<input
  class="new-todo"
  placeholder="할 일을 입력해주세요."
  autofocus
/>
</section>`;

const todoFilterView = `
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
`;

const clearBtnView = `<button class="clear-completed">모두 삭제</button>`;

export const addUserBtnView = `
<li class="add-user-button-container">
  <button id="add-user-button" class="ripple">
    <span class="material-icons">add</span>
  </button>
</li>`;

export const loadingView = ` <div>로딩중...😎</div>`;

export const EmptyView = `<div>아무것도 ..없어요!</div>`;

export const ErrorView = `<div> 잠시 후 다시 시도해주세요 🥶 </div>`;
