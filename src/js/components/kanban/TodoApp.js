import TodoListInput from './TodoListInput.js';
import TodoListItems from './TodoListItems.js';
import TodoListCounter from './TodoListCounter.js';
import Component from '../../core/Component.js';
import { $ } from '../../util/selector.js';

export default class TodoApp extends Component {
  setup() {
    this.$state = { show: 'ALL', count: this.$props.todoList.length };
    this.render();
  }

  mounted() {
    new TodoListInput($(`[data-app-id="${this.$props._id}"] .input-container`));
    new TodoListItems($(`[data-app-id="${this.$props._id}"] .main`), this.$props);
    new TodoListCounter($(`[data-app-id="${this.$props._id}"] .count-container`), {
      show: this.$state.show,
      count: this.$state.count,
    });
  }

  setEvent() {
    this.addEvent('keypress', 'addTodo', ({ key, target }) => {
      if (key !== 'Enter' || target.value.length) return;
      console.log('ㅁㄴㄹㅇㅁㄴ');
    });
  }

  template() {
    return `
      <section class="input-container"></section>
      <section class="main"></section>
      <div class="count-container"></div>
    `;
  }
}
