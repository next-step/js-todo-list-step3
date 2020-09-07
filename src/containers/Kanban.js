import {Component} from "../core/Component.js";
import {TodoHeader} from "../components/Todo/TodoHeader.js";
import {FETCH_TEAM, teamStore} from "../store/teamStore.js";
import {todoRouter} from "../router/todoRouter.js";
import {TodoList} from "../components/Todo/TodoList.js";

export const Kanban = class extends Component {

  render () {
    return `
      <h1 id="user-title"></h1>
      <ul id="todo-list" class="todoapp-list-container flex-column-container"></ul>
    `;
  }

  componentDidMount () {
    const $todoHeader = this.$target.querySelector('#user-title');
    const $todoList = this.$target.querySelector('#todo-list');
    const todoHeader = new TodoHeader($todoHeader);
    const todoList = new TodoList($todoList);

    teamStore.addObserve(todoHeader, todoList);

    teamStore.dispatch(FETCH_TEAM, todoRouter.$query.id);
  }

}