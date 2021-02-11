export const template = {
  cardContainer: (teamName, teamId) => {
    return `<div class="team-card-container" data-userid="${teamId}">
        <a class="card">
          <div class="card-title">
            ${teamName}
          </div>
          <button class="destroy"></button>
        </a>
      </div>`;
  },

  addTeamButton: () => {
    return `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>`;
  },

  todoAppContainer: (userId, userName) => {
    return `<li class="todoapp-container" data-userid= "${userId}">
    <h2>
      <span><strong>${userName}</strong>'s Todo List</span>
    </h2>
    <div class="todoapp">
      <section class="input-container">
        <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
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
  </li>`;
  },

  todoItem: (contents, itemId) => {
    return `<li class="todo-list-item" data-itemId="${itemId}">
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
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`;
  },

  addUserButton: () => {
    return `<li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>`;
  },
};
