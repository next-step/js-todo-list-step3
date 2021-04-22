export const todoAppTemplate = ({ _id, name, todoList }) => {
  return `
    <li data-_id=${_id} id=${_id} class="todoapp-container">
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
        ${todoFooter(todoList)}
      </div>
    </li>
  `;
};

const todoFooter = (todoList) => {
  return `
    <div class="count-container">
      <span class="todo-count">총 <strong>${todoList.length}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#all" class="all todo-filter selected">전체보기</a>
        </li>
        <li>
          <a href="#priority" class="priority todo-filter">우선 순위</a>
        </li>
        <li>
          <a href="#active" class="active todo-filter">해야할 일</a>
        </li>
        <li>
          <a href="#completed" class="completed todo-filter">완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed">모두 삭제</button>
    </div>
  `;
};

export const addMemberBtnTemplate = () => {
  return `
    <li class="add-user-button-container">
      <button id="add-user-button" class="ripple add-user-button">
        <span class="material-icons add-user-button">add</span>
      </button>
    </li>
  `;
};

export const todoTemplate = ({ contents, _id, isCompleted, priority }) => {
  return `
    <li data-_id="${_id}" class="${isCompleted && "completed"} todo-item-li">
        <div class="view">
            <input class="toggle" type="checkbox" data-_id="${_id}" ${isCompleted && "checked"} />
            <label class="label">
              ${todoPriority(priority)}
              ${contents}
            </label>
            <button class="destroy" data-_id="${_id}"></button>
        </div>
        <input class="edit" value="${contents}" />
    </li>
    `;
};

const todoPriority = (priority) => {
  if (priority === "FIRST") return firstPriority();
  if (priority === "SECOND") return secondPriority();
  return `
    <div class="chip-container">
      <select class="chip select">
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>
    </div>
  `;
};

const firstPriority = () => {
  return `
      <div class="chip-container">    
        <select class="chip select primary">
          <option value="1" selected="">1순위</option>
          <option value="2">2순위</option>
          <option value="0">미지정</option>
        </select>
      </div>  
    `;
};

const secondPriority = () => {
  return `
      <div class="chip-container">     
        <select class="chip select secondary">
          <option value="2" selected="">2순위</option>
          <option value="1">1순위</option>
          <option value="0">미지정</option>
        </select>
      </div>
    `;
};

export const teamTemplate = ({ _id, name }) => {
  const suffix = process.env.NODE_ENV === "development" ? ".html" : "";
  return `
    <div class="team-card-container">
      <a href="/kanban${suffix}?id=${_id}&name=${name}" class="card">
        <div class="card-title">
          ${name}
        </div>
      </a>
    </div>
  `;
};

export const teamAddBtnTemplate = () => {
  return `
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple add-team-button">
        <span class="material-icons add-team-button">add</span>
      </button>
    </div>
    `;
};
