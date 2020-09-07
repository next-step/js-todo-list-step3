import {Component} from "../../core/Component.js";
import {TodoMemberAppender} from "./TodoMemberAppender.js";
import {TodoList} from "./TodoList.js";
import {todoOfTeamStore} from "../../store/todoOfTeamStore.js";

export const TodoListOfTeam = class extends Component {

  render () {
    const { members } = todoOfTeamStore.$state;
    return `
      ${members.map(({ _id }) => `
        <li class="todoapp-container" data-id="${_id}"></li>
      `).join('')}
      <li id="todo-member-appender" class="add-user-button-container"></li>
    `
  }

  componentDidMount () {
    const $todoMemberAppender = this.$target.querySelector('#todo-member-appender');
    new TodoMemberAppender($todoMemberAppender);
    this.$target.querySelectorAll('.todoapp-container').forEach($todoList => {
      new TodoList($todoList, {
        id: $todoList.dataset.id
      });
    })
  }
}