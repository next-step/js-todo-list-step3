export const teamItem = (data) => {
  return `
      <div id="${data._id}" class="team-card-container">
        <a href="#" class="card">
          <div class="card-title">
            ${data.name}
          </div>
        </a>
      </div>
    `;
};

export const memberItem = (data) => {
  return `
    <li id="${data._id}" class="todoapp-container">
      <h2>
        <span><strong>${data.name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section class="input-container">
          <input id="new-todo-title" class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
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
    </li>
    `;
};

export const addTeamButton = () => {
  return `
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </div>
  `;
};

export const addMemberButton = () => {
  return `
    <li class="button-container add-user">
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </li>
  `;
};

export const goTeamListButton = () => {
  return `
    <div class="button-container go-team-list">
      <button id="go-team-list-button" class="ripple">
        <span class="material-icons">arrow_back</span>
      </button>
    </div>
  `;
};
