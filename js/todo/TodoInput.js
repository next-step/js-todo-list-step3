import { KEY_NAME } from '../utils/constants.js';

export default class TodoInput {
  constructor({ data, $targetNewTodo, onAddTodoItem }) {
    this.data = data;
    this.$targetNewTodo = $targetNewTodo;

    this.$targetNewTodo.addEventListener('click', (e) => {
      e.target.value = '';
    });

    this.$targetNewTodo.addEventListener('keyup', (e) => {
      if (e.key === KEY_NAME.ENTER && e.target.value !== '') {
        onAddTodoItem(e.target.value);
        e.target.value = '';
        return;
      }
    });
  }
}
