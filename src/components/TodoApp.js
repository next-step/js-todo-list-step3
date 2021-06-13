import { DOM_ID, KEY, PRIORITY, MESSAGGE, ACTION } from '@constants/constants.js';
import { $, getUrlParams, isEmptyObject } from '@utils/utils.js';
import { KanbanTitle, TodoList } from '@template/index';

import { teamAPI } from '@api/team';
import { todoAPI } from '@api/todo';
import { memberAPI } from '@api/member.js';

// state
import membersState from '@store/membersState.js';

export default class TodoApp {
  constructor() {
    this.$target = $(DOM_ID.TODO_LIST);

    membersState.subscribe(this.render.bind(this));

    this.init();
  }

  async init() {
    const teamId = getUrlParams().id;
    const team = await teamAPI.getTeam(teamId);
    const { members, name } = team;

    membersState.set(members.map((member) => ({ ...member, filter: 'all' })));

    $('#user-title').innerHTML = KanbanTitle(name);
    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('keypress', this.addTodo.bind(this));
    this.$target.addEventListener('keyup', this.closeEditMode.bind(this));
    this.$target.addEventListener('click', this.clickHandler.bind(this));
    this.$target.addEventListener('dblclick', this.openEditMode.bind(this));
    this.$target.addEventListener('change', this.changeSelector.bind(this));
  }

  clickHandler({ target }) {
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

    const teamId = getTeamId();
    const memberId = getMemberId(target);
    const contents = target.value;

    const todoItem = await todoAPI.createTodoItem(teamId, memberId, { contents });
    if (!todoItem) return;

    const prevMembers = membersState.get();
    const addedTodoList = prevMembers.map((member) =>
      member._id === memberId ? { ...member, todoList: member.todoList.concat(todoItem) } : member,
    );
    membersState.set(addedTodoList);
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
    // const teamId = getTeamId();
    // const result = await teamAPI.getTeam(teamId);
    // const { _id, members, name } = result;
    // const members = membersState.get();
    // console.log('members', members);

    // const filters = membersState.get().map((member) => member.filter);
    // membersState.set(members.map((member, idx) => ({ ...member, filter: filters[idx] })));

    // console.log('membersState', membersState.get());
    const members = membersState.get();
    // console.log('members', members);
    members.forEach((member) => {
      console.log('member', member);
      console.log('todoList', member.todoList);
    });

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

const getTeamId = () => getUrlParams().id;
const getMemberId = (target) => {
  const $todoApp = target.closest('.todoapp');
  const memberId = $todoApp && $todoApp.dataset['memberId'];
  return memberId;
};
