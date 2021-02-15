export const template = {
  cardContainer: (teamName, teamId) => {
    return `<div class="team-card-container" data-teamid="${teamId}">
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

  teamTitle: (teamName) => {
    return `<h1 id="user-title" data-teamname="${teamName}">
    <span><strong>${teamName}</strong>'s Todo List</span>
  </h1>`;
  },

  todoAppContainer: (memberId, memberName) => {
    return `<li class="todoapp-container" data-memberid= "${memberId}">
    <h2>
      <span><strong>${memberName}</strong>'s Todo List</span>
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
        <span class="todo-count"></span>
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

  todoItem: (contents, itemId, priority) => {
    let primary, secondary, select;

    if (priority === 'FIRST') {
      primary = '';
      secondary = 'hidden';
      select = 'hidden';
    } else if (priority === 'SECOND') {
      primary = 'hidden';
      secondary = '';
      select = 'hidden';
    } else {
      primary = 'hidden';
      secondary = 'hidden';
      select = '';
    }

    return `<li class="todo-list-item" data-itemId="${itemId}">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">
        <div class="chip-container">
          <span class="chip primary ${primary}">1순위</span>
          <span class="chip secondary ${secondary}">2순위</span>
          <select class="chip select ${select}">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        </div>
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${contents}" />
  </li>`;
  },

  addUserButton: () => {
    return `<li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>`;
  },

  chipContainer: () => {
    return `<div class="chip-container">
    <span class="chip primary hidden">1순위</span>
    <span class="chip secondary hidden">2순위</span>
    <select class="chip select">
      <option value="0" selected>순위</option>
      <option value="1">1순위</option>
      <option value="2">2순위</option>
    </select>
  </div>`;
  },

  count: (countNum) => {
    return ` 총 <strong>${countNum}</strong> 개`;
  },
};
