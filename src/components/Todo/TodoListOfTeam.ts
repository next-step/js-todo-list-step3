import {Component} from "@/core";
import {TodoMemberAppender} from "./TodoMemberAppender";
import {TodoList} from "./TodoList";
import {todoOfTeamStore} from "@/store";
import {selectAllElement, selectElement} from "@/utils";

export const TodoListOfTeam = class extends Component {

  protected template () {
    const { members } = todoOfTeamStore.$state;
    return `
      ${Object.keys(members).map(id => `
        <li class="todoapp-container" data-id="${id}"></li>
      `).join('')}
      <li id="todo-member-appender" class="add-user-button-container"></li>
    `
  }

  protected componentDidMount () {
    const $todoMemberAppender = selectElement('#todo-member-appender', this.$target);
    new TodoMemberAppender($todoMemberAppender);
    selectAllElement('.todoapp-container', this.$target).forEach($todoList => {
      new TodoList($todoList, {
        id: $todoList.dataset.id as string
      });
    })
  }

}
