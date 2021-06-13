import { CLASS_NAME, PRIORITY } from './constants.js';

export const teamTemplate = ({ _id, name }) => `
  <div class="team-card-container">
    <a href="kanban.html?id=${_id}" class="card">
      <div class="card-title">${name}</div>
    </a>
  </div>
`;

export const addTeamButtonTemplate = `
  <div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>
`;

export const todoItemTemplate = ({ _id, contents, isCompleted, priority }) => `
  <li id="${_id}" class="todo-list-item ${isCompleted ? 'completed' : ''}">
    <div class="view">
      <input id="${_id}" class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
      <label class="label">
        <div class="chip-container">
          <select class="chip select 
            ${priority === PRIORITY.FIRST ? 'primary' : ''}
            ${priority === PRIORITY.SECOND ? 'secondary' : ''}
          ">
            <option ${priority === PRIORITY.NONE ? CLASS_NAME.SELECTED : ''}>순위</option>
            <option ${priority === PRIORITY.FIRST ? CLASS_NAME.SELECTED : ''}>1순위</option>
            <option ${priority === PRIORITY.SECOND ? CLASS_NAME.SELECTED : ''}>2순위</option>
          </select>
        </div>
        ${contents}
      </label>
      <button id="${_id}" class="destroy"></button>
    </div>
    <input class="edit" value="${contents}" />
  </li>
`;

export const memberTemplate = ({ _id, name, todoList }) => {
  const todoListTemplate = todoList.map(todoItemTemplate);

  return `
    <li class="todoapp-container">
      <h2>
        <span><strong>${name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section class="input-container">
          <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
        </section>
      <section class="main">
        <ul class="todo-list">${todoListTemplate.join('')}</ul>
      </section>
        <div class="count-container">
          <span class="todo-count">총 <strong>0</strong> 개</span>
          <ul class="filters">
            <li>
              <a href="#all" class="selected">전체보기</a>
            </li>
            <li>
              <a href="#priority" class="priority">우선 순위</a>
            </li>
            <li>
              <a href="#active" class="active">해야할 일</a>
            </li>
            <li>
              <a href="#completed" class="completed">완료한 일</a>
            </li>
          </ul>
          <button class="clear-completed">모두 삭제</button>
        </div>
      </div>
    </li>
  `;
};

export const addMemberButtonTemplate = `
  <li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>
`;
