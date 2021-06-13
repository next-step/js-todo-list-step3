import { DOM_ID, KEY, PRIORITY, FILTER, MESSAGGE, ACTION } from '../constants/constants.js';
import { $, getUrlParams, isEmptyObject } from '../utils/utils.js';
import { teamAPI } from '../api/team';
import { UserTitle, TodoInput, TodoItem, TodoCount, KanbanTitle } from '../template/index';

import { todoAPI } from '../api/todo';
import { memberAPI } from '../api/member.js';

// state
import teamState from '@store/teamState.js';
import membersState from '@store/membersState.js';

function TodoList(member) {
  function comparePriority(todoItem1, todoItem2) {
    const priority1 = changePriorityToNumber(todoItem1.priority);
    const priority2 = changePriorityToNumber(todoItem2.priority);

    return priority1 - priority2;
  }

  function changePriorityToNumber(priority) {
    if (priority === 'FIRST') return 1;
    if (priority === 'SECOND') return 2;
    if (priority === 'NONE') return 3;
  }

  function getFilteredTodoList(todoList, filter = 'all') {
    return {
      [FILTER.ALL]: todoList,
      [FILTER.ACTIVE]: todoList.filter((todoItem) => !todoItem.isCompleted),
      [FILTER.COMPLETED]: todoList.filter((todoItem) => todoItem.isCompleted),
      [FILTER.PRIORITY]: [...todoList].sort(comparePriority),
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

    this.init();
  }

  async init() {
    const teamId = getUrlParams().id;
    const team = await teamAPI.getTeam(teamId);
    const { _id, members, name } = team;

    teamState.set({ teamId: _id, teamName: name });
    membersState.set(members.map((member) => ({ ...member, filter: 'all' })));

    $('#user-title').innerHTML = KanbanTitle(name);
    this.render();
    this.addEvent();
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

    if (!target.dataset['action']) return;

    const _ = {
      [ACTION.DELETE_TODO]: () => this.deleteTodo(teamId, memberId, todoId),
      [ACTION.TOGGLE_TODO]: () => this.toggleTodo(teamId, memberId, todoId),
      [ACTION.ALL_DELETE_TODO]: () => this.allDeleteTodo(teamId, memberId),
      [ACTION.CHANGE_FILTER]: () => this.changeFilter(memberId, target),
      [ACTION.CREATE_MEMBER]: () => this.createMember(teamId),
    }[target.dataset['action']]();
  }

  async changeSelector({ target }) {
    if (!target.classList.contains('chip')) return;

    console.log('changeSelector');

    const teamId = getTeamId();
    const memberId = getMemberId(target);
    const itemId = target.closest('li').id;

    const selectValue = target.value;
    if (selectValue === PRIORITY['select']) return;

    const result = await todoAPI.priorityTodoItem(teamId, memberId, itemId, {
      priority: selectValue,
    });

    if (isEmptyObject(result)) return;
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
    if (isEmptyObject(result)) return;
    this.render();
  }

  async deleteTodo(teamId, memberId, todoId) {
    await todoAPI.deleteTodoItem(teamId, memberId, todoId);
    this.render();
  }

  async toggleTodo(teamId, memberId, todoId) {
    const result = await todoAPI.toggleTodoItem(teamId, memberId, todoId);
    if (isEmptyObject(result)) return;
    this.render();
  }

  async updateTodoContents(teamId, memberId, itemId, contents) {
    const result = await todoAPI.updateTodoItemContents(teamId, memberId, itemId, {
      contents,
    });
    if (isEmptyObject(result)) return;
    this.render();
  }

  async allDeleteTodo(teamId, memberId) {
    await todoAPI.allDeleteTodo(teamId, memberId);
    this.render();
  }

  async createMember(teamId) {
    const memberName = prompt(MESSAGGE.CREATE_USER);
    if (!memberName) return;

    const result = await memberAPI.createMember(teamId, { name: memberName });
    if (isEmptyObject(result)) return;
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

  openEditMode({ target }) {
    if (target.classList.value !== 'label') return;

    const todoItem = target.closest('li');
    todoItem.classList.add('editing');
  }

  closeEditMode({ target, key }) {
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

    this.updateTodoContents(teamId, memberId, itemId, updatedValue);
  }

  async render() {
    const teamId = getUrlParams().id;
    const result = await teamAPI.getTeam(teamId);
    const { _id, members, name } = result;

    teamState.set({ teamId: _id, teamName: name });
    const filters = membersState.get().map((member) => member.filter);
    membersState.set(members.map((member, idx) => ({ ...member, filter: filters[idx] })));

    this.$target.innerHTML = `
      ${membersState.get().map((member) => TodoList(member))}
      <li class="add-user-button-container">
        <button id="add-user-button" class="ripple" data-action="add-member">
          <span class="material-icons" data-action="add-member">add</span>
        </button>
      </li>  
    `;
  }
}

const getTeamId = () => teamState.get().teamId;
const getMemberId = (target) => {
  const $todoApp = target.closest('.todoapp');
  const memberId = $todoApp && $todoApp.dataset['memberId'];
  return memberId;
};
