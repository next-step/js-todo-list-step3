export const todoAppTemplate = (todoId, name, count) => {
  return `
    <li id=${todoId} class="todoapp-container">
      <h2>
        <span><strong>${name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section class="input-container">
          <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
        </section>
        <section class="main">
          <ul class="todo-list"></ul>
        </section>
        ${todoFilterTemplate(count)}
      </div>
    </li>
  `;
};

export const todoFilterTemplate = (count) => {
  return `
    <div class="count-container">
      <span class="todo-count">총 <strong>${count}</strong> 개</span>
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
};

export const addUserButtonTemplate = () => {
  return `
    <li class="add-user-button-container">
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </li>
  `;
};

export const todoTemplate = ({ contents, _id, isCompleted, priority }) => {
  return `
    <li data-_id="${_id}" class="${isCompleted && "completed"} todo-item-li">
        <div class="view">
            <input class="toggle" type="checkbox" data-_id="${_id}" ${isCompleted && "checked"} />
            <label class="label">
              ${todoPriorityTemplate(priority)}
              ${contents}
            </label>
            <button class="destroy" data-_id="${_id}"></button>
        </div>
        <input class="edit" value="${contents}" />
    </li>
    `;
};

export const todoPriorityTemplate = (priority) => {
  if (priority === "FIRST") return '<span class="chip primary">1순위</span>';
  if (priority === "SECOND") return '<span class="chip secondary">2순위</span>';
  return `
    <select class="chip select">
      <option value="NONE" selected>순위</option>
      <option value="FIRST">1순위</option>
      <option value="SECOND">2순위</option>
    </select>
    `;
};

export const teamTemplate = (teamId, teamName) => {
  return `
    <div class="team-card-container">
      <a href="/kanban.html?id=${teamId}&name=${teamName}" class="card">
        <div class="card-title">
          ${teamName}
        </div>
      </a>
    </div>
  `;
};

export const teamAddButtonTemplate = () => {
  return `
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple add-team-button">
        <span class="material-icons add-team-button">add</span>
      </button>
    </div>
    `;
};
