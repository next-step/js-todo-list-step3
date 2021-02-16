const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/teams/";

const $todoAppContainer = (teamName) => `
  <li class="todoapp-container">
          <h2>
            <span><strong>${teamName}</strong>'s Todo List</span>
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
                  <a href="#all" class="all">전체보기</a>
                </li>
                <li>
                  <a href="#priority">우선 순위</a>
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

const $indexTeam = (teamName, teamId) => `
        <div class="team-card-container">
          <a href="./kanban.html?${teamId}" class="card">
            <div class="card-title">
             ${teamName}
            </div>
          </a>
        </div>`;

const $indexTeamAdd = `
        <div class="add-team-button-container">
          <button id="add-team-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </div>`;

const $kanbanHeader = (teamName) =>
  `<div id="app">
      <h1 id="user-title" data-username=${teamName}>
        <span><strong>${teamName}</strong>'s Todo List</span>
      </h1>
      <ul class="todoapp-list-container flex-column-container">
      </ul>
    </div>`;

const $todoListItem = (item, isCompleted) => {
  if (isCompleted)
    return `
        <li class="todo-list-item completed">
                  <div class="view">
                    <input class="toggle" type="checkbox" checked="true" />
                    <label class="label">
                      <div class="chip-container">
                        <select class="chip select">
                          <option value="0" >순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      ${item}
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="완료된 타이틀" />
         </li>
`;
  else
    return `
        <li class="todo-list-item active">
                  <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">
                      <div class="chip-container">
                        <select class="chip select">
                          <option value="0">순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      ${item}
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="완료된 타이틀" />
         </li>
`;
};

const $appMemberAdd = `
    <li class="add-user-button-container">
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </li>
`;

const $label = (item) => `
                      <div class="chip-container">
                        <select class="chip select">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      ${item}

`;
export {
  $todoAppContainer,
  $todoListItem,
  $indexTeam,
  $indexTeamAdd,
  baseUrl,
  $kanbanHeader,
  $appMemberAdd,
  $label,
};
