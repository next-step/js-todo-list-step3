import TodoListInput from './TodoListInput.js';
import TodoListItems from './TodoListItems.js';
import TodoListCounter from './TodoListCounter.js';
import Component from '../../core/Component.js';
import { $ } from '../../util/selector.js';
import { PRIORITY } from '../../constant/todo.js';

export default class TodoApp extends Component {
  setup() {
    this.allTodos();
  }

  mounted() {
    new TodoListInput(
      $(`[data-member-id="${this.$props._id}"] .input-container`),
      this.$props._id
    );
    new TodoListItems($(`[data-member-id="${this.$props._id}"] .main`), this.$state);
    new TodoListCounter($(`[data-member-id="${this.$props._id}"] .count-container`), {
      show: this.$state.show,
      count: this.$state.count,
      allTodos: _ => this.allTodos(),
      priorityTodos: _ => this.priorityTodos(),
      activeTodos: _ => this.activeTodos(),
      completedTodos: _ => this.completedTodos(),
    });
  }

  template() {
    return `
      <section class="input-container"></section>
      <section class="main"></section>
      <div class="count-container"></div>
    `;
  }

  allTodos() {
    const allTodos = this.$props.todoList;
    this.setState({
      show: 'ALL',
      todoList: allTodos,
      count: allTodos.length,
    });
  }

  priorityTodos() {
    const prioritySortedTodos = this.$props.todoList
      .slice()
      .sort((a, b) => PRIORITY[b.priority] - PRIORITY[a.priority]);
    this.setState({
      show: 'PRIORITY',
      todoList: prioritySortedTodos,
      count: prioritySortedTodos.length,
    });
  }

  activeTodos() {
    const activeTodos = this.$props.todoList.filter(({ isCompleted }) => !isCompleted);
    this.setState({
      show: 'ACTIVE',
      todoList: activeTodos,
      count: activeTodos.length,
    });
  }

  completedTodos() {
    const completedTodos = this.$props.todoList.filter(({ isCompleted }) => isCompleted);
    this.setState({
      show: 'COMPLETED',
      todoList: completedTodos,
      count: completedTodos.length,
    });
  }
}
