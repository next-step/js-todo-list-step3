import { FILTER, PRIORITY } from '@constants/constants.js';
import { getFilteredTodoList } from './helper';

export function KanbanTitle(teamName) {
  return `
    <span><strong>${teamName}</strong>'s Todo List</span>
  `;
}

function UserTitle(memberName) {
  return `
      <h2>
        <span><strong>${memberName}</strong>'s Todo List</span>
      </h2>
    `;
}

function TodoInput() {
  return `<section class="input-container">
      <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
    </section>
    `;
}

function getPriortyTemplate(priority) {
  return `
    <div class="chip-container">
      <select class="chip select ${PRIORITY[priority]}" >
        <option value="NONE" ${PRIORITY[priority] === 'select' ? 'selected' : ''}>
          순위
        </option>
        <option value="FIRST" ${PRIORITY[priority] === 'primary' ? 'selected' : ''}>
          1순위
        </option>
        <option value="SECOND" ${PRIORITY[priority] === 'secondary' ? 'selected' : ''}>2순위
        </option>
      </select>
    </div>
    `;
}

function TodoItem({ _id, contents, isCompleted, priority }) {
  const selectView = getPriortyTemplate(priority);
  return `
    <li id="${_id}" class="${isCompleted && 'completed'}">
      <div class="view">
        <input id="${_id}" data-action="toggle" class="toggle" type="checkbox" ${
    isCompleted && 'checked'
  }/>
        <label class="label">
          ${selectView}
          ${contents}
        </label>
        <button id=${_id} data-action="destroy" class="destroy"></button>
      </div>
      <input id="${_id}" class="edit" value=${contents} />
    </li>
    `;
}

function TodoCount(todoCount, filter) {
  return `
    <div class="count-container">
    <span class="todo-count">총 <strong>${todoCount}</strong> 개</span>
    <ul class="filters">
      <li>
        <a href="#all" data-action="change-filter" data-type="all" 
          class="${filter === FILTER.ALL ? 'selected' : ''}"  
        >
          전체보기
        </a>
      </li>
      <li>
        <a href="#priority" data-action="change-filter" data-type="priority"
          class="${filter === FILTER.PRIORITY ? 'selected' : ''}"
        >
          우선 순위
        </a>
      </li>
      <li>
        <a href="#active" data-action="change-filter" data-type="active"
          class="${filter === FILTER.ACTIVE ? 'selected' : ''}"
        >
          해야할 일
        </a>
      </li>
      <li>
        <a href="#completed"  data-action="change-filter"  data-type="completed" 
          class="${filter === FILTER.COMPLETED ? 'selected' : ''}" data-type="completed"
        >
          완료한 일
        </a>
      </li>
    </ul>
    <button data-action="clear-completed" class="clear-completed" >모두 삭제</button>
  </div>
    `;
}

export function TodoList(member) {
  let todoList = member.todoList;
  todoList = getFilteredTodoList(todoList, member.filter);

  return `
    <li class="todoapp-container">
      ${UserTitle(member.name)}
      <div class="todoapp" data-member-id="${member._id}">
        ${TodoInput()}
        <section class="main">
          <ul class="todo-list">
            ${todoList.map((todoItem) => TodoItem(todoItem))}
          </ul>
        </section>
        ${TodoCount(todoList.length, member.filter)}
      </div>
    </li>
    `;
}
