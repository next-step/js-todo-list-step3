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

export const memberTemplate = ({ _id, name }) => `
  <li class="todoapp-container">
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

export const addMemberButtonTemplate = `
  <li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>
`;
