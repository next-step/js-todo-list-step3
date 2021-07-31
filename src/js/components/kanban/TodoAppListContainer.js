import TodoApp from './TodoApp.js';
import Component from '../../core/Component.js';
import { kanbanAPI } from '../../api/kanban.js';
import { store } from '../../store/index.js';
import { $ } from '../../util/selector.js';

export default class TodoAppListContainer extends Component {
  mounted() {
    store.state.members.forEach(({ _id, name, todoList }) => {
      new TodoApp($(`[data-member-id="${_id}"]`), { _id, name, todoList });
    });
  }

  setEvent() {
    this.addEvent('click', 'addTodoApp', async _ => {
      const name = prompt('이름을 입력해주세요');
      if (name.length < 2) return;
      await kanbanAPI.addMemberToTeam(store.state.id, name);
    });
  }

  template() {
    return (
      `${store.state.members
        .map(
          ({ _id, name }) => `<li class="todoapp-container">
          <h2>
            <span><strong>${name}</strong>'s Todo List</span>
          </h2>
          <div class="todoapp" data-member-id="${_id}"></div>
        </li>`
        )
        .join('')}` +
      `<li class="add-user-button-container">
          <button id="add-user-button" class="ripple" data-action="addTodoApp">
            <span class="material-icons">add</span>
          </button>
        </li>
      `
    );
  }
}
