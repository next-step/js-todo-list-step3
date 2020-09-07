import {Component} from "../../core/Component.js";
import {TodoAppender} from "./TodoAppender.js";
import {TodoList} from "./TodoList.js";
import {todoOfTeamStore} from "../../store/todoOfTeamStore.js";

export const TodoListOfTeam = class extends Component {

  render () {
    const { members } = todoOfTeamStore.$state;
    return `
      ${members.map(({ _id }) => `
        <li class="todoapp-container" data-id="${_id}"></li>
      `).join('')}
      <li id="todo-appender" class="add-user-button-container"></li>
    `
  }

  componentDidMount () {
    const $todoAppender = this.$target.querySelector('#todo-appender');
    new TodoAppender($todoAppender);
    this.$target.querySelectorAll('.todoapp-container').forEach($todoList => {
      new TodoList($todoList, {
        id: $todoList.dataset.id
      });
    })
  }
}