import { CLASS_SELECTOR, FILTER } from "./constants.js";

export const teamCardContainer = (team) => `
<div class="${CLASS_SELECTOR.TEAM_CARD_CONTAINER}" data-team-id="${team._id}">
    <a href="/kanban.html?team-id=${team._id}" class="card">
        <span class="${CLASS_SELECTOR.DELETE_TEAM}">❌</span>
        <div class="card-title">${team.name}</div>
    </a>
</div>
`;

export const loadingCircle = () =>
  `<div class="loading-container"><div class="loading-circle"></div></div>`;

export const loadingBar = () => `
  <li>
    <div class="${CLASS_SELECTOR.VIEW}">
      <label class="${CLASS_SELECTOR.LABEL}">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
  </li>
`;

export const indexTitle = () =>
  `<h1><span><strong>Team</strong>'s Todo Lists</span></h1>`;

export const kanbanTitle = (teamName) =>
  `<span><strong>${teamName}</strong>'s Todo List</span>`;

export const todoTitle = (memberName) =>
  `<span><strong>${memberName}</strong>'s Todo List</span>`;

const todolabelTemplate = (priority) => {
  switch (priority) {
    case 1:
      return `<span class="${CLASS_SELECTOR.CHIP} primary">1순위</span>`;
    case 2:
      return `<span class="${CLASS_SELECTOR.CHIP} secondary">2순위</span>`;
    default:
      return "";
  }
};

export const todoItem = (todo) => `
<li class="${CLASS_SELECTOR.TODO_LIST_ITEM} ${
  todo.isCompleted ? "completed" : ""
}" data-todo-id="${todo._id}">
  <div class="${CLASS_SELECTOR.VIEW}">
    <input class="${CLASS_SELECTOR.TOGGLE}" type="checkbox" ${
  todo.isCompleted ? "checked" : ""
}/>
    <label class="${CLASS_SELECTOR.LABEL}">
      <div class="${CLASS_SELECTOR.CHIP_CONTAINER}">
        ${todolabelTemplate(todo.priority)}
        <select class="${CLASS_SELECTOR.CHIP} ${CLASS_SELECTOR.SELECT} ${
  [1, 2].includes(todo.priority) ? "hidden" : ""
}">
          <option value="0" ${
            `${todo.priority}` === "0" ? "selected" : ""
          }>순위</option>
          <option value="1" ${
            `${todo.priority}` === "1" ? "selected" : ""
          }>1순위</option>
          <option value="2" ${
            `${todo.priority}` === "2" ? "selected" : ""
          }>2순위</option>
        </select>
      </div>
      <span class="${CLASS_SELECTOR.CONTENTS}">${todo.contents}</span>
    </label>
    <button class="${CLASS_SELECTOR.DESTROY}"></button>
  </div>
  <input class="${CLASS_SELECTOR.EDIT}" value="${todo.contents}" />
</li>
`;

export const todoCount = (count, filter) => `
  <span class="todo-count">총 <strong>${count}</strong> 개</span>
    <ul class="filters">
      <li>
        <a href="#${FILTER.ALL}" class="${CLASS_SELECTOR.FILTER} ${
  filter === FILTER.ALL || !filter ? "selected" : ""
}" data-filter="${FILTER.ALL}">전체보기</a>
      </li>
      <li>
        <a href="#${FILTER.PRIORITY}" class="${CLASS_SELECTOR.FILTER} ${
  filter === FILTER.PRIORITY ? "selected" : ""
}" data-filter="${FILTER.PRIORITY}">우선 순위</a>
      </li>
      <li>
        <a href="#${FILTER.ACTIVE}" class="${CLASS_SELECTOR.FILTER} ${
  filter === FILTER.ACTIVE ? "selected" : ""
}" data-filter="${FILTER.ACTIVE}">해야할 일</a>
      </li>
      <li>
        <a href="#${FILTER.COMPLETED}" class="${CLASS_SELECTOR.FILTER} ${
  filter === FILTER.COMPLETED ? "selected" : ""
}" data-filter="${FILTER.COMPLETED}">완료한 일</a>                  
      </li>
    </ul>
    <button class="${CLASS_SELECTOR.CLEAR_COMPLETED}">모두 삭제</button>
`;
