import { PRIORITY } from '../constants/constants.js';

export function UserTitle(memberName) {
  return `
      <h2>
        <span><strong>${memberName}</strong>'s Todo List</span>
      </h2>
    `;
}

export function TodoInput() {
  return `<section class="input-container">
      <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
    </section>
    `;
}

export function getPriortyTemplate(priority) {
  return PRIORITY[priority] === 'select'
    ? `
          <select class="chip select">
            <option value="${PRIORITY['NONE']}" selected>순위</option>
            <option value="${PRIORITY['FIRST']}">1순위</option>
            <option value="${PRIORITY['SECOND']}">2순위</option>
          </select>
        `
    : `
        <span class="chip ${priority}">${priority === PRIORITY['FIRST'] ? '1' : '2'}순위</span>
      `;
}

export function TodoItem({ _id, contents, isCompleted, priority }) {
  const selectView = getPriortyTemplate(priority);
  return `
    <li id="${_id}" class="${isCompleted && 'completed'}">
      <div class="view">
        <input id="${_id}" class="toggle" type="checkbox" ${isCompleted && 'checked'}/>
        <label class="label">
          ${selectView}
          ${contents}
        </label>
        <button id=${_id} class="destroy"></button>
      </div>
      <input id="${_id}" class="edit" value=${contents} />
    </li>
    `;
}

export function TodoCount() {
  return `
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
    `;
}

export function TodoList(member) {
  const todoList = member.todoList;

  return `
    <li class="todoapp-container">
      ${UserTitle(member.name)}
    <div class="todoapp">
      ${TodoInput()}
      <section class="main">
        <ul class="todo-list">
          ${todoList.map((todoItem) => TodoItem(todoItem))}
        </ul>
      </section>
        ${TodoCount()}
    </div>
  </li>
    `;
}

export function KanbanTitle(teamName) {
  return `
    <span><strong>${teamName}</strong>'s Todo List</span>
  `;
}
