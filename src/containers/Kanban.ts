import {Component} from "@/core";
import {TodoHeader} from "@/components/Todo/TodoHeader";
import {todoRouter} from "@/router/todoRouter";
import {TodoListOfTeam} from "@/components/Todo/TodoListOfTeam";
import {FETCH_TEAM, todoOfTeamStore} from "@/store/todoOfTeamStore";
import {TodoMemberAppendForm} from "@/components/Todo/TodoMemberAppendForm";

export const Kanban = class extends Component {

  protected async componentInit() {
    await todoOfTeamStore.dispatch(FETCH_TEAM, todoRouter.$query.id);

    this.$children = {
      TodoHeader: { constructor: TodoHeader },
      TodoListOfTeam: { constructor: TodoListOfTeam },
      TodoMemberAppendForm: { constructor: TodoMemberAppendForm },
    }
  }

  template () {
    return `
      <h1 data-component="TodoHeader" id="user-title"></h1>
      <ul data-component="TodoListOfTeam" id="todo-list-of-team" class="todoapp-list-container flex-column-container"></ul>
      <div data-component="TodoMemberAppendForm" id="member-append-form"></div>
    `;
  }

}