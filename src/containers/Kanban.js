import {Component} from "../core/Component.js";
import {TodoHeader} from "../components/Todo/TodoHeader.js";
import {todoRouter} from "../router/todoRouter.js";
import {TodoListOfTeam} from "../components/Todo/TodoListOfTeam.js";
import {FETCH_TEAM, todoOfTeamStore} from "../store/todoOfTeamStore.js";
import {TodoMemberAppendForm} from "../components/Todo/TodoMemberAppendForm.js";

export const Kanban = class extends Component {

  render () {
    return `
      <h1 id="user-title"></h1>
      <ul id="todo-list-of-team" class="todoapp-list-container flex-column-container"></ul>
      <div id="member-append-form"></div>
    `;
  }

  componentDidMount () {
    const $todoHeader = this.$target.querySelector('#user-title');
    const $todoListOfTeam = this.$target.querySelector('#todo-list-of-team');
    const $memberAppendForm = this.$target.querySelector('#member-append-form');

    const todoHeader = new TodoHeader($todoHeader);
    const todoListOfTeam = new TodoListOfTeam($todoListOfTeam);
    const todoMemberAppendForm = new TodoMemberAppendForm($memberAppendForm);

    todoOfTeamStore.addObserve(todoHeader, todoListOfTeam, todoMemberAppendForm);
    todoOfTeamStore.dispatch(FETCH_TEAM, todoRouter.$query.id);
  }

}