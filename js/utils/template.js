export const teamCardContainer = ({ name, _id }) =>
  `<div class="team-card-container">
    <a href="/kanban.html?team=${_id}" class="card">
        <div class="card-title">${name}</div>
    </a>
  </div>`;

export const addTeamButtonContainer = `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
    </button>
  </div>`;

export const teamHeader = name => `<span><strong>${name}</strong>'s Todo List</span>`;

export const memberHeader = name => `<h2><span><strong>${name}</strong>'s Todo List</span></h2>`;

export const memberTodoInput = `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`;

const todoItemPriority = priority => `
<div class="chip-container">
<select class="chip select">
    <option value="0" ${priority === 0 ? 'selected' : ''}>순위</option>
    <option value="1" ${priority === 1 ? 'selected' : ''}>1순위</option>
    <option value="2" ${priority === 2 ? 'selected' : ''}>2순위</option>
</select>
</div>`;

export const memberTodoItem = ({
  _id,
  contents,
  isCompleted,
  priority
}) => `<li class="todo-list-item ${isCompleted ? 'completed' : ''}">
<div class="view">
  <input class="toggle" type="checkbox" name=${_id} ${isCompleted ? 'checked' : ''}>
  <label class="label" for="${_id}">
    ${todoItemPriority(priority)}
    <span>${contents}</span>
  </label>
  <button class="destroy" name=${_id}></button>
</div>
<input class="edit" name=${_id} value="${contents}" />
</li>`;

export const memberTodoCountContainer = `
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
    <button class="clear-completed">모두 삭제</button>`;

export const addMemberButton = `<button id="add-user-button" class="ripple">
  <span class="material-icons">add</span>
</button>`;

/*
<li class="todo-list-item">
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label">
            <div class="chip-container">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            해야할 아이템
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>
      <li class="todo-list-item">
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label">
            <div class="chip-container">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            해야할 아이템
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>
      <li class="todo-list-item">
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label">
            <div class="chip-container">
              <span class="chip primary">1순위</span>
              <select class="chip select hidden">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            <span class="todo-item-text">해야할 아이템</span>
          </label>
          <button class="delete"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>
      <li class="todo-list-item">
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label">
            <div class="chip-container">
              <span class="chip secondary">1순위</span>
              <select class="chip select hidden">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            해야할 아이템
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>
      <li class="todo-list-item completed">
        <div class="view">
          <input class="toggle" type="checkbox" checked />
          <label class="label">
            <div class="chip-container">
              <span class="chip primary">1순위</span>
              <select class="chip select hidden">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            완료된 아이템
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>
      <li class="todo-list-item editing">
        <div class="view">
          <input class="toggle" type="checkbox" checked />
          <label class="label">
            <div class="chip-container">
              <span class="chip primary">1순위</span>
              <select class="chip select hidden">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            수정중인 아이템
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="수정중인 타이틀" />
      </li>
*/
