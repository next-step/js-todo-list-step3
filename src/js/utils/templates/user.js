import { PRIORITY, CLASS_NAME } from '../constants.js';

export const todoListHTML = (member) => `
  <li id=${member._id} class="todo-list-container">  
    ${userTitleHTML(member.name)}
    <div class="todo-list">
      ${todoInputHTML()}
      <section class="todo-list-main">
        <ul class="todo-list-body">
          ${member.todoList.map((todo) => todoItemHTML(todo)).join('')}
        </ul>
      </section>
      <div class="count-container">
        ${todoCountHTML(member.todoList.length)}
        ${todoTabHTML(member.selectedTab)}
        ${todoClearAllButtonHTML()}
      </div>
    </div>
  </li>
`;

export const addUserButtonHTML = () => `
  <li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>
`;

const userTitleHTML = (name) => `
  <h2>
    <span><strong>${name}</strong>'s Todo List</span>
  </h2>`;

const todoInputHTML = () => `
  <section class="input-container">
    <input
      class="new-todo"
      placeholder="할 일을 입력해주세요."
      autofocus
    />
  </section>`;

const prioritySelectHTML = () => `
  <select class="chip select">
    <option value="0" selected>선택</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>
  </select>`;

const priorityLabelHTML = (priority) => {
  return priority === PRIORITY.PRIMARY
    ? `<span class="chip primary">1순위</span>`
    : `<span class="chip secondary">2순위</span>`;
};

const todoItemHTML = (todo) => `
  <li id=${todo._id} class="todo-list-item ${
  todo.isCompleted ? CLASS_NAME.COMPLETED : ''
}">
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.isCompleted && 'checked'}/>
      <label class="label">
        <div class="chip-container">
          ${
            todo.priority === PRIORITY.NONE
              ? prioritySelectHTML()
              : priorityLabelHTML(Number(todo.priority))
          }
        </div>
        ${todo.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${todo.contents}" />
  </li>
`;

const todoCountHTML = (count) => `
  <span class="todo-count">총 <strong>${count}</strong> 개</span>
`;

const todoTabHTML = (selected) => `
  <ul class="todo-tab">
    <li>
      <span class="all ${
        selected === CLASS_NAME.ALL ? CLASS_NAME.SELECTED : ''
      }">전체보기</span>
    </li>
    <li>
      <span class="priority ${
        selected === CLASS_NAME.PRIORITY ? CLASS_NAME.SELECTED : ''
      }">우선 순위</span>
    </li>
    <li>
      <span class="active ${
        selected === CLASS_NAME.ACTIVE ? CLASS_NAME.SELECTED : ''
      }">해야할 일</span>
    </li>
    <li>
      <span class="completed ${
        selected === CLASS_NAME.COMPLETED ? CLASS_NAME.SELECTED : ''
      }">완료한 일</span>
    </li>
  </ul>
`;

const todoClearAllButtonHTML = () => `
  <button class="clear-completed">모두 삭제</button>
`;
