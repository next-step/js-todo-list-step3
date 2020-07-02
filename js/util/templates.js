import { MEANING } from './constants.js';

export const TeamListTemplate = (teamList) =>
  teamList
    .map(
      (team) => `
          <div class="team-card-container">
            <a href="/kanban.html?name=${team.name}&id=${team._id}" class="card">
              <div class="card-title">
                ${team.name}
              </div>
            </a>
          </div>
    `,
    )
    .join('').concat(`
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
      `);

export const TeamTitleTemplate = (teamName) => `
      <span><strong>${teamName}</strong>'s Todo List</span>
    `;

const PRIORITY = {
  [MEANING.NOTHING]: `<select class="chip select">
                        <option value="0" selected>순위</option>
                        <option value="1">1순위</option>
                        <option value="2">2순위</option>
                      </select>`,
  [MEANING.PRIMARY]: `<span class="chip primary">1순위</span>
                      <select class="chip select hidden">
                        <option value="0" selected>순위</option>
                        <option value="1">1순위</option>
                        <option value="2">2순위</option>
                      </select>`,
  [MEANING.SECONDARY]: `  <span class="chip secondary">2순위</span>
                          <select class="chip select hidden">
                            <option value="0" selected>순위</option>
                            <option value="1">1순위</option>
                            <option value="2">2순위</option>
                          </select>`,
};

export const TodoCountTemplate = (todoCount) => `
총 <strong>${todoCount}</strong> 개
  `;

export const TodoListTemplate = (todoList) =>
  todoList
    .map(
      (todo) => `
      <li class=${
        todo.isCompleted ? 'todo-list-item completed' : 'todo-list-item'
      } data-id=${todo._id}>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            todo.isCompleted ? 'checked' : ''
          } />
          <label class="label">
          <div class="chip-container">
            ${PRIORITY[todo.priority]}
          </div>
            ${todo.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" placeholder=${todo.contents} value="" />
      </li>
      `,
    )
    .join('');

export const MemberListTemplate = (memberList) =>
  memberList
    .map(
      (member) => `
      <li class="todoapp-container">
      <h2>
        <span><strong>${member.name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section class="input-container">
          <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
        </section>
        <section class="main">
          <ul class="todo-list">
            ${(member.todoList && TodoListTemplate(member.todoList)) || ''}
          </ul>
        </section>
        <div class="count-container">
          <span class="todo-count">${
            member.todoList
              ? TodoCountTemplate(member.todoList.length)
              : TodoCountTemplate(0)
          }</span>
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
      `,
    )
    .join('').concat(`
        <li class="add-user-button-container">
          <button id="add-user-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </li>
`);
