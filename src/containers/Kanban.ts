import {Component} from "../core/Component";
import {TodoHeader} from "../components/Todo/TodoHeader";
import {todoRouter} from "../router/todoRouter";
import {TodoListOfTeam} from "../components/Todo/TodoListOfTeam";
import {FETCH_TEAM, todoOfTeamStore} from "../store/todoOfTeamStore";
import {TodoMemberAppendForm} from "../components/Todo/TodoMemberAppendForm";

export const Kanban = class extends Component<{}> {

  template () {
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