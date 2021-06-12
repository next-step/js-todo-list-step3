import { DOM_ID, FILTER, PRIORITY } from '../constants/constants.js';
import { $, getUrlParams } from '../utils/utils.js';
import { teamAPI } from '../api/team';

// state
import teamState from '@store/teamState.js';
import membersState from '@store/membersState.js';

// components
import KanbanTitle from './kanban/KanbanTitle';

export default class TodoApp {
  constructor() {
    this.$target = $(DOM_ID.TODO_LIST);

    // state
    this.teamState = teamState;
    this.membersState = membersState;

    return (async () => {
      await this.init();
      new KanbanTitle();

      return this;
    })();
  }

  async init() {
    const teamId = getUrlParams().id;
    const result = await teamAPI.getTeam(teamId);
    const { _id, members, name } = result;

    this.teamState.set({ teamId: _id, teamName: name });
    this.membersState.set(members);

    // console.log('team', this.teamState.get());
    // console.log('member', this.membersState.get());

    this.$target.innerHTML = membersState.get().map((member) => TodoList(member));
  }
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
  return PRIORITY[priority] === 'select'
    ? `
        <select class="chip select">
          <option value="${PRIORITY['NONE']}" selected>순위</option>
          <option value="${PRIORITY['FIRST']}">1순위</option>
          <option value="${PRIORITY['SECOND']}">2순위</option>
        </select>
      `
    : `
      <span class="chip ${priority}">${priority === PRIORITY['FIRST'] ? '1' : '2'}순위</span>
    `;
}

function TodoItem({ _id, contents, isCompleted, priority }) {
  const selectView = getPriortyTemplate(priority);
  return `
  <li id="${_id}" class="${isCompleted && 'completed'}">
    <div class="view">
      <input id="${_id}" class="toggle" type="checkbox" ${isCompleted && 'checked'}/>
      <label class="label">
        ${selectView}
        ${contents}
      </label>
      <button id=${_id} class="destroy"></button>
    </div>
    <input id="${_id}" class="edit" value=${contents} />
  </li>
  `;
}

function TodoCount() {
  return `
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
  `;
}

function TodoList(member) {
  const todoList = member.todoList;
  console.log('TodoList member', member);

  return `
  <li class="todoapp-container">
    ${UserTitle(member.name)}
  <div class="todoapp">
    ${TodoInput()}
    <section class="main">
      <ul class="todo-list">
        ${todoList.map((todoItem) => TodoItem(todoItem))}
      </ul>
    </section>
      ${TodoCount()}
  </div>
</li>
  `;
}
