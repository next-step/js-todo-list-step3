import {Component} from "../../core/Component";
import {TodoMemberAppender} from "./TodoMemberAppender";
import {TodoList} from "./TodoList";
import {todoOfTeamStore} from "../../store/todoOfTeamStore";

export const TodoListOfTeam = class extends Component {

  render () {
    const { members } = todoOfTeamStore.$state;
    return `
      ${Object.keys(members).map(id => `
        <li class="todoapp-container" data-id="${id}"></li>
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