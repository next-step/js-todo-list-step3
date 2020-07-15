export const teamCardTemplate = (team) => `
  <div class="team-card-container">
    <a href="/kanban.html?teamId=${team._id}&teamName=${team.name}" class="card">
      <div class="card-title">
        ${team.name}
      </div>
    </a>
  </div>`

export const addTeamButtonContainerTemplate = `
  <div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>`

export const addUserButtonContainerTemplate = `
  <li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>`

export const todoAppContainerTemplate = (member) => `
  <li class="todoapp-container">
    <h2>
      <span><strong>${member.name}</strong>'s Todo List</span>
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
            <a href="#all" class="all selected">전체보기</a>
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
  </li>`

export const todoPriorityTemplate = (priority) =>
  priority
    ? `<span class="chip ${
        priority === 1 ? 'primary' : 'secondary'
      }">${priority}순위</span>`
    : `<select class="chip select">
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>`

export const todoItemTemplate = (todoItem, index) => `
  <li data-id="${todoItem._id}" data-index="${index}" class="${
  todoItem.isCompleted ? 'completed' : ''
}">
    <div class="view">
      <input class="toggle" type="checkbox" ${
        todoItem.isCompleted ? 'checked' : ''
      }>
      <label class="label">
        ${todoPriorityTemplate(todoItem.priority)}
        ${todoItem.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todoItem.contents}">
  </li>`
