import {Component} from "../core/Component.js";
import {TodoHeader} from "../components/Todo/TodoHeader.js";
import {FETCH_TEAM, teamStore} from "../store/teamStore.js";
import {todoRouter} from "../router/todoRouter.js";
import {TodoListOfTeam} from "../components/Todo/TodoListOfTeam.js";

export const Kanban = class extends Component {

  render () {
    return `
      <h1 id="user-title"></h1>
      <ul id="todo-list-of-team" class="todoapp-list-container flex-column-container"></ul>
    `;
  }

  componentDidMount () {
    const $todoHeader = this.$target.querySelector('#user-title');
    const $todoListOfTeam = this.$target.querySelector('#todo-list-of-team');
    const todoHeader = new TodoHeader($todoHeader);
    const todoListOfTeam = new TodoListOfTeam($todoListOfTeam);

    teamStore.addObserve(todoHeader, todoListOfTeam);

    teamStore.dispatch(FETCH_TEAM, todoRouter.$query.id);
  }

}