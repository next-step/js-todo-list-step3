import { KEYCODE_ENTER } from '../constants.js';
import { isValidContent } from '../util.js';

function TodoInput({ $rootElement, addTodo }) {
  const $todoInput = $rootElement.querySelector('.new-todo');

  this.onKeyUpTodoInput = (event) => {
    if (event.key !== KEYCODE_ENTER) return;

    const newTodoContents = event.target.value;
    if (!isValidContent(newTodoContents)) return;

    addTodo(newTodoContents);
    $todoInput.value = '';
  };

  $todoInput.addEventListener('keyup', this.onKeyUpTodoInput);
}

export default TodoInput;
