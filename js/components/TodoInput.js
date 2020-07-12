import { KEYCODE_ENTER } from '../constants.js';
import { isValidContent } from '../util.js';

function TodoInput({ $rootElement, addTodo }) {
  const $todoInput = $rootElement.querySelector('.new-todo');

  $todoInput.addEventListener('keyup', (event) => this.addTodo(event));

  this.addTodo = (event) => {
    if (event.key !== KEYCODE_ENTER) return;

    const newTodoContents = event.target.value;
    if (!isValidContent(newTodoContents)) return;

    addTodo(newTodoContents);
    $todoInput.value = '';
  };
}

export default TodoInput;
