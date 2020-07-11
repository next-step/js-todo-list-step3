export const teamItemTemplate = item => (
  `<div class="team-card-container">
    <a href="/kanban.html?id=${item._id}" class="card">
      <div class="card-title">
        ${item.name}
      </div>
    </a>
  </div>`
);

export const teamAddItemTemplate = () => (
  `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>`
);

export const memberTodosTemplate = item => (
  `<li class="todoapp-container">
    <h2>
      <span><strong>${item.name}</strong>'s Todo List</span>
    </h2>
    <div class="todoapp">
      <section class="input-container">
        <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
      </section>
      <section class="main">
        <ul class="todo-list">
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
  </li>`
);

export const memberAddItemTemplate = () => (
  `<li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>`
)