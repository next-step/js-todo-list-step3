import TodoApp from './TodoApp.js';
import Component from '../../core/Component.js';
import { $ } from '../../util/selector.js';

export default class TodoAppListContainer extends Component {
  mounted() {
    this.$props.forEach(({ _id, name, todoList }) => {
      new TodoApp($(`[data-app-id="${_id}"]`), { _id, name, todoList });
    });
  }

  template() {
    return (
      `${this.$props
        .map(
          ({ _id, name }) => `<li class="todoapp-container">
          <h2>
            <span><strong>${name}</strong>'s Todo List</span>
          </h2>
          <div class="todoapp" data-app-id="${_id}"></div>
        </li>`
        )
        .join('')}` +
      `<li class="add-user-button-container">
          <button id="add-user-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </li>
      `
    );
  }
}
