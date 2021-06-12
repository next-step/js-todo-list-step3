import { DOM_ID } from '../constants/constants.js';
import { $, getUrlParams } from '../utils/utils.js';
import { teamAPI } from '../api/team';
import { UserTitle, TodoInput, TodoItem, TodoCount, KanbanTitle } from '../template/index';

// state
import teamState from '@store/teamState.js';
import membersState from '@store/membersState.js';

function TodoList(member) {
  const todoList = member.todoList;

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

    this.$target.innerHTML = membersState.get().map((member) => TodoList(member));
  }

  renderTeamTitle() {
    $(DOM_ID.TEAM_TITLE).innerHTML = KanbanTitle(teamState.get().teamName);
  }

  addEvent() {
    this.$target.addEventListener('click', () => console.log('test'));
  }
}
