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
export const createTeamButtonTemplate = () => `
          <button id="add-team-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
`

/* Team Page Templte End */

/* Kanban Page Template Start */
export const kanbanHeaderTemplate = (teamName) =>
  `<span><strong>${teamName}</strong>\'s Todo List</span>`

export const todoHeaderTemplate = (userName) => `
          <h2>
            <span><strong>${userName}</strong>'s Todo List</span>
          </h2>
`
export const todoFilterTemplate = `
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
`

export const addMemberButtonTemplate = `
            <button id="add-user-button" class="ripple">
              <span class="material-icons">add</span>
            </button>
`

export const loadingComponentTemplate = ` 
                <li>
                    <div class="view">
                        <label class="label">
                            <div class="animated-background">
                                <div class="skel-mask-container">
                                    <div class="skel-mask"></div>
                                </div>
                            </div>
                        </label>
                    </div>
                </li>`

export const todoCountComponentTemplate = (totalCount, completedCount) => {
  return `
    <span id="todo-count" class="todo-count">총 <span class="count">${totalCount}</span> 개 중</span>
    <span id="completed-count" class="todo-count"><span class="count">${completedCount}</span> 개 완료</span>`
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

export const todoItemHTMLTemplate = (
  { _id, contents, priority, isCompleted },
  index
) => {
  return `
      <li data-id=${_id} data-index=${index} class="todo-list-item ${
    isCompleted ? 'completed' : ''
  }">
          <div class="view">
            <input class="toggle" type="checkbox" ${
              isCompleted ? 'checked' : ''
            }/>
            <label class="label">
                ${getPriorityHTML(priority)}
                ${contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${contents} />
      </li>`
}
