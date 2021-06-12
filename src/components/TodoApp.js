import { DOM_ID, FILTER } from '../constants/constants.js';
import { $, getUrlParams } from '../utils/utils.js';
import { teamAPI } from '../api/team';

// state
import UserState from '@store/userState.js';
import TodoState from '@store/todoState.js';
import FilterState from '@store/filterState.js';
import teamState from '@store/teamState.js';

// components
import UserCreate from './TodoList/UserCreate';

export default class TodoApp {
  constructor() {
    // state
    this.todoState = TodoState;
    this.filterState = FilterState;
    this.userState = UserState;
    this.teamState = teamState;

    this.init();

    new UserCreate();

    // return (async () => {
    //   // components
    //   this.userList = await new UserList();
    //   new TodoInput();
    //   this.todoList = new TodoList();
    //   this.todoCount = new TodoCount();

    //   return this;
    // })();
  }

  async init() {
    const teamId = getUrlParams().id;
    const result = await teamAPI.getTeam(teamId);

    console.log(result);
    this.teamState.set(result);

    this.renderTitle();
  }

  renderTitle() {
    $(DOM_ID.TEAM_TITLE).innerHTML = `
      <span><strong>${this.teamState.get().name}</strong>'s Todo List</span>
    `;
  }

  render() {
    const filter = this.filterState.get();
    let todoList = this.todoState.get();
    todoList = this.getFilteredTodoList(todoList, filter);

    this.userList && this.userList.render();
    this.todoList && this.todoList.render(todoList);
    this.todoCount && this.todoCount.renderCount(todoList ? todoList.length : 0);
  }

  getFilteredTodoList(todoList, filter) {
    return {
      [FILTER.ALL]: todoList,
      [FILTER.ACTIVE]: todoList.filter((todoItem) => !todoItem.isCompleted),
      [FILTER.COMPLETED]: todoList.filter((todoItem) => todoItem.isCompleted),
    }[filter];
  }
}
