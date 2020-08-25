import { CLASS_NAME } from './constants.js'

/* Team Page Template Start */
export const teamHeaderTemplate = '<span><strong>Team</strong> Lists</span>'

export const teamButtonTemplate = ({ _id, name }) => `
        <div class="team-card-container">
          <a href="/kanban.html?teamId=${_id}&teamName=${name}" class="card">
            <div class="card-title">
              ${name}
            </div>
          </a>
        </div>
`
export const createTeamButtonTemplate = `
          <button id="add-team-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
`

/* Team Page Templte End */

/* Kanban Page Template Start */
export const kanbanHeaderTemplate = (teamName) =>
  `<span><strong>${teamName}</strong>\'s Todo List</span>`

export const todoCountHTMLtTemplate = (count) => {
  return `
    <span class="count">${count}</span></span>`
}

export const todoListHTMLTemplate = ({ _id, name }) => {
  return `
    <li class="todoapp-container" id=${_id}>
      <h2>
        <span><strong>${name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section class="input-container">
          <input
            class="new-todo"
            placeholder="할 일을 입력해주세요."
            autofocus
          />
        </section>
        <section class="main">
          <ul class="todo-list"></ul>
        </section>
        <div class="count-container">
          <span id="todo-count" class="todo-count"></span>
          <span id="completed-count" class="todo-count"><</span>
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
  </li>`
}

export const memberAddHTMLTemplate = `
  <li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>`

export const todoItemHTMLTemplate = (
  { _id, contents, priority, isCompleted },
  index
) => {
  return `
    <li data-id=${_id} data-index=${index} draggable="true" class="todo-list-item ${
    isCompleted ? 'completed' : ''
  }">
          <div class="view">
            <input class="toggle" type="checkbox" ${
              isCompleted ? 'checked' : ''
            }/>
            <label class="label" data-index=${index} data-id=${_id}>
                ${getPriorityHTML(priority)}
                <span class="todo-contents">${contents}</span>
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${contents} />
      </li>`
}

const getPriorityClassName = (priority) => {
  return priority === '1'
    ? CLASS_NAME.PRIORITY_FIRST
    : CLASS_NAME.PRIORITY_SECOND
}

const getPriorityHTML = (priority) => {
  return priority
    ? `<span class="chip ${getPriorityClassName(
        priority
      )}">${priority}순위</span>`
    : `<select class="chip select">
         <option value="0" selected>순위</option>
         <option value="1">1순위</option>
         <option value="2">2순위</option>
      </select>`
}
