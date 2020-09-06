import { ALL, COMPLETED, TOGGLE, EDIT, ACTIVE, PRIORITY } from "./data.js";

export const skeletonTemplate = `
  <li>
    <div class="view">
      <label class="label">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
  </li>
`;

export const userTemplate = currentUser => `<span><strong>${currentUser}</strong>'s Todo List</span>`;

export const todoCountTemplate = todoCount => `총 <strong>${todoCount}</strong> 개`;

export const todoErrorTemplate = error => `
  <h3>Error occured..Something is wrong with the user's data</h3>
  <p>${error}</p>
`;

export const todoInputTemplate = `
  <input
    class="new-todo"
    placeholder="할 일을 입력해주세요."
    autofocus
  />
`;

export const todoListTemplate = todoList => `
  <ul class="todo-list">
    ${todoList.map(({ contents, isCompleted, _id, priority }) => `
          <li data-id=${_id} class="todo-list-item ${isCompleted ? COMPLETED : ""}">
              <div class="view">
                <input class=${TOGGLE} type="checkbox" ${isCompleted ? "checked" : ""} />
                <label class="label">
                  <div class="chip-container">
                    ${priority === 1 ? `<span class="chip primary">1순위</span>` : priority === 2 ? `<span class="chip secondary">2순위</span>` : `<select class="chip select ${priority > 0 ? "hidden" : ""}">
                            <option value="0" selected>
                              순위
                            </option>
                            <option value="1">1순위</option>
                            <option value="2">2순위</option>
                          </select>`}
                  </div>
                  ${contents}
                </label>
                <button class="destroy"></button>
              </div>
              <input class=${EDIT} value="${contents}" />
          </li>
        `).join("")}
  </ul>
`;

export const todoUsersTemplate = (users, currentUserId) => `
${users.map(({ _id, name }) => `<button data-id=${_id} class="ripple ${_id === currentUserId ? ACTIVE : ""}">${name}</button>`).join("")}
`;

export const teamListTemplate = (_id, name) => `
  <div class="team-card-container" data-id=${_id}>
    <a href="/kanban.html?id=${_id}" class="card">
      <div class="card-title">${name}</div>
    </a>
  </div>
`;

export const addTeamBtnTemplate = `
  <div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>
`;

export const teamAppTitleTemplate = `<strong>Team</strong>'s Todo Lists`;

export const teamTitleTemplate = name => `
  <span><strong>${name}</strong>'s Todo List</span>
`;

export const todoBottomTemplate = (todoCount, type) => `
  <span class="todo-count">총 <strong>${todoCount}</strong> 개</span>
  <ul class="filters">
    <li>
      <a href="#all" class="${type === ALL || type === "/" ? "selected" : ""}">전체보기</a>
    </li>
    <li>
      <a href="#priority" class="${type === PRIORITY ? "selected" : ""}">우선 순위</a>
    </li>
    <li>
      <a href="#active" class="${type === ACTIVE ? "selected" : ""}">해야할 일</a>
    </li>
    <li>
      <a href="#completed" class="${type === COMPLETED ? "selected" : ""}">완료한 일</a>
    </li>
  </ul>
  <button class="clear-completed">모두 삭제</button>
`;

export const todoTitleTemplate = name => `
  <span><strong>${name}</strong>'s Todo List</span>
`;

export const errorCallTemplate = `Invalid function call..this is undefined`;