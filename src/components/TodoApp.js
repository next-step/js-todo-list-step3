import { DOM_ID, KEY } from '../constants/constants.js';
import { $, getUrlParams } from '../utils/utils.js';
import { teamAPI } from '../api/team';
import { UserTitle, TodoInput, TodoItem, TodoCount, KanbanTitle } from '../template/index';

import { todoAPI } from '../api/todo';

// state
import teamState from '@store/teamState.js';
import membersState from '@store/membersState.js';

function TodoList(member) {
  const todoList = member.todoList;

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
        ${TodoCount()}
    </div>
  </li>
    `;
}

export default class TodoApp {
  constructor() {
    this.$target = $(DOM_ID.TODO_LIST);

    return (async () => {
      await this.init();

      this.renderTeamTitle();

      this.addEvent();
      return this;
    })();
  }

  async init() {
    const teamId = getUrlParams().id;
    const result = await teamAPI.getTeam(teamId);
    const { _id, members, name } = result;

    teamState.set({ teamId: _id, teamName: name });
    membersState.set(members);

    this.render();
    // this.$target.innerHTML = membersState.get().map((member) => TodoList(member));
  }

  renderTeamTitle() {
    $(DOM_ID.TEAM_TITLE).innerHTML = KanbanTitle(teamState.get().teamName);
  }

  addEvent() {
    this.$target.addEventListener('keypress', this.addTodo.bind(this));
    this.$target.addEventListener('click', this.test.bind(this));
  }

  async test({ target }) {
    const teamId = getTeamId();
    const memberId = getMemberId(target);
    const todoId = target.id;

    if (target.classList.contains('destroy')) {
      this.deleteTodo(teamId, memberId, todoId);
      return;
    }

    if (target.classList.contains('toggle')) {
      console.log('toggle', teamId, memberId, todoId);
      this.toggleTodo(teamId, memberId, todoId);
    }
  }

  async addTodo({ code, target }) {
    if (code !== KEY.ENTER) return;

    const todoContents = target.value;
    if (todoContents.length < 2) {
      alert(MESSAGGE.CREATE_CONTENTS_VALIDATE_ERROR);
      return;
    }

    const $todoApp = target.closest('.todoapp');
    const teamId = getTeamId();
    const memberId = $todoApp && $todoApp.dataset['memberId'];
    const contents = target.value;

    const result = await todoAPI.createTodoItem(teamId, memberId, { contents });
    this.render();
  }

  async deleteTodo(teamId, memberId, todoId) {
    const result = await todoAPI.deleteTodoItem(teamId, memberId, todoId);
    this.render();
  }

  async toggleTodo(teamId, memberId, todoId) {
    const result = await todoAPI.toggleTodoItem(teamId, memberId, todoId);
    console.log(result);
    this.render();
  }

  async render() {
    const teamId = getUrlParams().id;
    const result = await teamAPI.getTeam(teamId);
    const { _id, members, name } = result;

    teamState.set({ teamId: _id, teamName: name });
    membersState.set(members);

    this.$target.innerHTML = membersState.get().map((member) => TodoList(member));
  }
}

const getTeamId = () => teamState.get().teamId;
const getMemberId = (target) => {
  const $todoApp = target.closest('.todoapp');
  const memberId = $todoApp && $todoApp.dataset['memberId'];
  return memberId;
};
