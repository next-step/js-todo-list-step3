export const teamTemplate = {
    _id: "",
    name: "",
    members: [],
}

export const userTemplate = {
    _id: "",
    name: "",
    todoList: [],
}

export const todoItemTemplate = {
    _id: "",
    contents: "",
    priority: "NONE",
    isCompleted: false,
}

export const teamTemplateHTML = team => `
    <div class="team-card-container" id=${team._id}>
        <a href="/kanban.html#${team._id}#all" class="card">
            <div class="card-title">
              ${team.name}
            </div>
        </a>
    </div>
`;

export const todoListTemplateHTML = user => `
    <li class="todoapp-container" id=${user._id}>
          <h2>
            <span><strong>${user.name}</strong>'s Todo List</span>
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
        </li>
`;

export const todoItemTemplateHTML = item => `
    <li class="todo-list-item ${(item.isCompleted) ? "completed" : ""}" id=${item._id}>
        <div class="view">
            <input class="toggle" type="checkbox" ${item.isCompleted ? 'checked': ''}/>
            <label class="label">
                <div class="chip-container">
                    <select class="chip select ${(item.priority === "FIRST") ? 'primary' : (item.priority === "SECOND") ? 'secondary' : ''}">
                        <option value="0" ${item.priority === "NONE" ? 'selected' : ''}>순위</option>
                        <option value="1" ${item.priority === "FIRST" ? 'selected' : ''}>1순위</option>
                        <option value="2" ${item.priority === "SECOND" ? 'selected' : ''}>2순위</option>
                    </select>
                </div>
                ${item.contents}
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${item.contents} />
    </li>
`;

export const addTeamButtonHTML = `
  <button id="add-team-button" class="ripple">
    <span class="material-icons">add</span>
  </button>
  `;