import { CLASS_NAME, FILTER_STATUS, PRIORITY } from './constants.js';

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
            <option value="0" ${priority === PRIORITY.NONE ? CLASS_NAME.SELECTED : ''}>순위</option>
            <option value="1" ${priority === PRIORITY.FIRST ? CLASS_NAME.SELECTED : ''}>1순위</option>
            <option value="2" ${priority === PRIORITY.SECOND ? CLASS_NAME.SELECTED : ''}>2순위</option>
          </select>
        </div>
        ${contents}
      </label>
      <button id="${_id}" class="destroy"></button>
    </div>
    <input class="edit" value="${contents}" />
  </li>
`;

function changePriorityToNumber(priority) {
  if (priority === PRIORITY.NONE) return 99;
  if (priority === PRIORITY.FIRST) return 1;
  if (priority === PRIORITY.SECOND) return 2;
}

function getSortedTodoList(todoList) {
  const newTodoList = todoList.slice();
  newTodoList.sort((a, b) => {
    const A = changePriorityToNumber(a.priority);
    const B = changePriorityToNumber(b.priority);
    return A - B;
  });
  return newTodoList;
}

function getFilteredTodoList(filterStatus, todoList) {
  if (!todoList) return [];
  if (filterStatus === FILTER_STATUS.PRIORITY) return getSortedTodoList(todoList);
  if (filterStatus === FILTER_STATUS.ALL) return todoList;
  if (filterStatus === FILTER_STATUS.ACTIVE) {
    return todoList.filter((item) => !item.isCompleted);
  }
  if (filterStatus === FILTER_STATUS.COMPLETED) {
    return todoList.filter((item) => item.isCompleted);
  }
}

export const memberTemplate = ({ _id, name, todoList, filterStatus }) => {
  const filteredTodoList = getFilteredTodoList(filterStatus, todoList);
  const todoListTemplate = filteredTodoList.map(todoItemTemplate);

  return `
    <li class="todoapp-container">
      <h2>
        <span><strong>${name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section class="input-container">
          <input id="${_id}" class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
        </section>
      <section class="main">
        <ul class="todo-list" id="${_id}">${todoListTemplate.join('')}</ul>
      </section>
        <div class="count-container">
          <span class="todo-count">총 <strong>${filteredTodoList.length}</strong> 개</span>
          <ul class="filters">
            <li>
              <a id="${_id}"
                class="all ${filterStatus === FILTER_STATUS.ALL ? CLASS_NAME.SELECTED : ''}">
                전체보기 
              </a>
            </li>
            <li>
              <a id="${_id}" 
                class="priority ${filterStatus === FILTER_STATUS.PRIORITY ? CLASS_NAME.SELECTED : ''}">
                우선 순위
              </a>
            </li>
            <li>
              <a id="${_id}" 
                class="active ${filterStatus === FILTER_STATUS.ACTIVE ? CLASS_NAME.SELECTED : ''}">
                해야할 일
              </a>
            </li>
            <li>
              <a id="${_id}"
                class="completed ${filterStatus === FILTER_STATUS.COMPLETED ? CLASS_NAME.SELECTED : ''}">
                완료한 일
              </a>
            </li>
          </ul>
          <button id="${_id}" class="clear-completed">모두 삭제</button>
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
