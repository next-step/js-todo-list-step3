import { DOM_ID, KEY, PRIORITY, MESSAGGE, ACTION } from '@constants/constants.js';
import { $, getUrlParams, isEmptyObject } from '@utils/utils.js';
import { KanbanTitle, TodoList } from '@template/index';

import { teamAPI } from '@api/team';
import { todoAPI } from '@api/todo';
import { memberAPI } from '@api/member.js';

// state
import store, {
  initState,
  createMember,
  addTodoItem,
  deleteTodoItem,
  toggleTodoItem,
  updateContentsTodoItem,
  allDeleteTodoItem,
  changePirortyTodoItem,
} from '@modules/member';

export default class TodoApp {
  constructor() {
    this.$target = $(DOM_ID.TODO_LIST);

    store.subscribe(this.render.bind(this));
    this.init();
  }

  async init() {
    const teamId = getUrlParams().id;
    const team = await teamAPI.getTeam(teamId);
    const { members, name } = team;

    $(DOM_ID.TEAM_TITLE).innerHTML = KanbanTitle(name);

    store.dispatch(initState(members));
    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('keypress', this.addTodo.bind(this));
    this.$target.addEventListener('keyup', this.closeEditMode.bind(this));
    this.$target.addEventListener('click', this.clickHandler.bind(this));
    this.$target.addEventListener('dblclick', this.openEditMode.bind(this));
    this.$target.addEventListener('change', this.changePirority.bind(this));
  }

  clickHandler({ target }) {
    const teamId = getTeamId();
    const memberId = getMemberId(target);
    const itemId = target.id;

    if (!target.dataset['action']) return;

    const _ = {
      [ACTION.DELETE_TODO]: () => this.deleteTodo(teamId, memberId, itemId),
      [ACTION.TOGGLE_TODO]: () => this.toggleTodo(teamId, memberId, itemId),
      [ACTION.ALL_DELETE_TODO]: () => this.allDeleteTodo(teamId, memberId),
      [ACTION.CHANGE_FILTER]: () => this.changeFilter(memberId, target),
      [ACTION.CREATE_MEMBER]: () => this.createMember(teamId),
    }[target.dataset['action']]();
  }

  async createMember(teamId) {
    const memberName = prompt(MESSAGGE.CREATE_USER);
    if (!memberName) return;

    const team = await memberAPI.createMember(teamId, { name: memberName });
    if (isEmptyObject(team)) return;

    // 상태 업데이트
    const members = team.members;
    const newMember = members[members.length - 1];

    store.dispatch(createMember(newMember));
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

    // 상태 업데이트
    store.dispatch(addTodoItem(memberId, todoItem));
  }

  async deleteTodo(teamId, memberId, itemId) {
    await todoAPI.deleteTodoItem(teamId, memberId, itemId);

    store.dispatch(deleteTodoItem(memberId, itemId));
  }

  async toggleTodo(teamId, memberId, itemId) {
    const updatedToggleTodoItem = await todoAPI.toggleTodoItem(teamId, memberId, itemId);
    if (isEmptyObject(updatedToggleTodoItem)) return;

    store.dispatch(toggleTodoItem(memberId, itemId, updatedToggleTodoItem));
  }

  async updateTodoContents(teamId, memberId, itemId, contents) {
    const updatedContentsTodoIem = await todoAPI.updateTodoItemContents(teamId, memberId, itemId, {
      contents,
    });
    if (isEmptyObject(updatedContentsTodoIem)) return;

    store.dispatch(updateContentsTodoItem(memberId, itemId, updatedContentsTodoIem));
  }

  async allDeleteTodo(teamId, memberId) {
    await todoAPI.allDeleteTodo(teamId, memberId);

    store.dispatch(allDeleteTodoItem(memberId));
  }

  async changePirority({ target }) {
    if (!target.classList.contains('chip')) return;

    const teamId = getTeamId();
    const memberId = getMemberId(target);
    const itemId = target.closest('li').id;

    const selectValue = target.value;
    if (selectValue === PRIORITY['select']) return;

    const updatedPriortyTodoItem = await todoAPI.priorityTodoItem(teamId, memberId, itemId, {
      priority: selectValue,
    });

    if (isEmptyObject(updatedPriortyTodoItem)) return;

    store.dispatch(changePirortyTodoItem(memberId, itemId, updatedPriortyTodoItem));
  }

  changeFilter(memberId, target) {
    const filter = target.dataset['type'];

    const members = store.get();
    const updatedMembers = members.map((member) =>
      member._id === memberId ? { ...member, filter } : member,
    );
    store.set(updatedMembers);
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

  render() {
    this.$target.innerHTML = `
      ${store.get().map((member) => TodoList(member))}
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
