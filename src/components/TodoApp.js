import { DOM_ID, KEY, PRIORITY, FILTER } from '../constants/constants.js';
import { $, getUrlParams } from '../utils/utils.js';
import { teamAPI } from '../api/team';
import { UserTitle, TodoInput, TodoItem, TodoCount, KanbanTitle } from '../template/index';

import { todoAPI } from '../api/todo';

// state
import teamState from '@store/teamState.js';
import membersState from '@store/membersState.js';

function TodoList(member) {
  function getFilteredTodoList(todoList, filter = 'all') {
    return {
      [FILTER.ALL]: todoList,
      [FILTER.ACTIVE]: todoList.filter((todoItem) => !todoItem.isCompleted),
      [FILTER.COMPLETED]: todoList.filter((todoItem) => todoItem.isCompleted),
      [FILTER.PRIORITY]: todoList,
    }[filter];
  }

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
    membersState.set(members.map((member) => ({ ...member, filter: 'all' })));

    this.$target.innerHTML = membersState.get().map((member) => TodoList(member));
  }

  renderTeamTitle() {
    $(DOM_ID.TEAM_TITLE).innerHTML = KanbanTitle(teamState.get().teamName);
  }

  addEvent() {
    this.$target.addEventListener('keypress', this.addTodo.bind(this));
    this.$target.addEventListener('keyup', this.closeEditMode.bind(this));
    this.$target.addEventListener('click', this.clickHandler.bind(this));
    this.$target.addEventListener('dblclick', this.openEditMode.bind(this));
    this.$target.addEventListener('change', this.changeSelector.bind(this));
  }

  async clickHandler({ target }) {
    const teamId = getTeamId();
    const memberId = getMemberId(target);
    const todoId = target.id;

    if (target.classList.contains('destroy')) {
      this.deleteTodo(teamId, memberId, todoId);
      return;
    }

    if (target.classList.contains('toggle')) {
      this.toggleTodo(teamId, memberId, todoId);
      return;
    }

    if (target.classList.contains('clear-completed')) {
      this.allDeleteTodo(teamId, memberId);
      return;
    }

    if (target.tagName === 'A') {
      this.changeFilter(memberId, target);
      return;
    }
  }

  async changeSelector({ target }) {
    if (!target.classList.contains('chip')) return;

    const $todoApp = target.closest('.todoapp');
    const teamId = getTeamId();
    const memberId = $todoApp && $todoApp.dataset['memberId'];
    const itemId = target.closest('li').id;

    const selectValue = target.value;
    if (selectValue === PRIORITY['select']) return;

    const result = await todoAPI.priorityTodoItem(teamId, memberId, itemId, {
      priority: selectValue,
    });
    // console.log(result);
    this.render();
  }

  async addTodo({ code, target }) {
    if (code !== KEY.ENTER) return;
    if (!target.classList.contains('new-todo')) return;

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
    // console.log(result);
    this.render();
  }

  async updateTodoContents(teamId, memberId, itemId, contents) {
    const result = await todoAPI.updateTodoItemContents(teamId, memberId, itemId, {
      contents,
    });
    // console.log(result);
    this.render();
  }

  async allDeleteTodo(teamId, memberId) {
    const result = await todoAPI.allDeleteTodo(teamId, memberId);
    // console.log('allDeleteTodo', result);
    this.render();
  }

  changeFilter(memberId, target) {
    const filter = target.dataset['type'];
    const members = membersState.get();

    const updatedMembers = members.map((member) =>
      member._id === memberId ? { ...member, filter } : member,
    );
    membersState.set(updatedMembers);

    this.render();
  }

  async render() {
    const teamId = getUrlParams().id;
    const result = await teamAPI.getTeam(teamId);
    const { _id, members, name } = result;

    teamState.set({ teamId: _id, teamName: name });
    const filters = membersState.get().map((member) => member.filter);
    membersState.set(members.map((member, idx) => ({ ...member, filter: filters[idx] })));

    this.$target.innerHTML = membersState.get().map((member) => TodoList(member));
  }

  openEditMode({ target }) {
    if (target.classList.value !== 'label') return;

    const todoItem = target.closest('li');
    todoItem.classList.add('editing');
  }

  async closeEditMode({ target, key }) {
    if (!(key === KEY.ESC || key === KEY.ENTER)) return;
    if (target.classList.contains('new-todo')) return;

    const todoItem = target.closest('li');
    if (key === KEY.ESC) {
      todoItem.classList.remove('editing');
      return;
    }

    const teamId = getTeamId();
    const memberId = getMemberId(target);
    const itemId = target.id;
    const updatedValue = todoItem.querySelector('.edit').value;

    await this.updateTodoContents(teamId, memberId, itemId, updatedValue);
  }
}

const getTeamId = () => teamState.get().teamId;
const getMemberId = (target) => {
  const $todoApp = target.closest('.todoapp');
  const memberId = $todoApp && $todoApp.dataset['memberId'];
  return memberId;
};
