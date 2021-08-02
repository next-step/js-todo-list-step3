import Component from '../../core/Component.js';
import { store } from "../../store/index.js";
import { kanbanAPI } from "../../api/kanban.js";

export default class TodoListInput extends Component {
  setEvent() {
    this.addEvent('keypress', 'addTodo', async ({ key, target }) => {
      if (key !== 'Enter') return;
      await kanbanAPI.addTodoItem(store.state.id, this.$props, target.value);
    });
  }

  template() {
    return `<input class="new-todo" data-action="addTodo" placeholder="할 일을 입력해주세요." autofocus />`;
  }
}
