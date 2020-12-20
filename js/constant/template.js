export const common = {
  title: (name = 'Team') => `<h1 id="user-title" data-username="">
                                       <span><strong>${name}</strong>'s Todo Lists</span>
                                     </h1>`
};
export const teamBoard = {
  teamCard: (teamInfo) => `<div class="team-card-container" data-id=${teamInfo._id} data-name=${teamInfo.name}>
                             <a class="card">
                              <div class="card-title">
                                ${teamInfo.name}
                              </div>
                             </a>
                           </div>`,
  addCard: `<button id="add-team-button" class="ripple">
              <span class="material-icons">add</span>
             </button> `
};
export const kanbanBoard = {
  todoListContainer: `<ul class="todoapp-list-container flex-column-container">
                        <li class="todoapp-container">
                           <div class="todoapp">
                             <section class="main">
                                <ul class="todo-list">
                                </ul>
                             </section>
                           </div>
                        </li>
                      </ul>`,
  addTodoList: `<button id="add-user-button" class="ripple">
                    <span class="material-icons">add</span>
                </button>`
}

export const todoList = {
  title: (userName = '') => `<h2 id="user-title"> <span><strong>${userName}</strong>'s Todo List</span></h2>`,

  inputBox: `<div class="todoapp">
              <section class="input-container">
                <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
              </section>`
  ,
  todoContainer: `<section class="main">
                      <ul class="todo-list">
                      </ul>
                  </section>`,

  todoContent: (task) => ` <div class="view">
                             <input class="toggle" type="checkbox" ${task.isCompleted ? 'checked' : ''}/>
                             <label class="label">
                                ${task.contents}
                             </label>
                             <button class="destroy"></button>
                           </div>
                           <input class="edit" value=${task.contents} />`,

  todoBottom: `
                    <div class="count-container">
                      <span class="todo-count">총 <strong>0</strong> 개</span>
                      <ul class="filters">
                        <li>
                            <a class="all selected" >전체보기</a>
                        </li>
                        <li>
                          <a  class="priority">우선 순위</a>
                        </li>
                        <li>
                            <a class="active">해야할 일</a>
                        </li>
                        <li>
                            <a  class="completed">완료한 일</a>
                        </li>
                      </ul>
                      <button class="clear-completed">모두 삭제</button>
                    </div>
                    </div> `,
}

export const priorityHTML = {
  NONE: ` <div class="chip-container">
           <select class="chip select">
            <option value="0" selected="">순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        </div>`,
  FIRST: `<div class="chip-container">
            <span class="chip primary">1순위</span>
            <select class="chip select hidden">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
          </div>`,
  SECOND: `<div class="chip-container">
            <span class="chip secondary">2순위</span>
            <select class="chip select hidden">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
          </div>
`
};
