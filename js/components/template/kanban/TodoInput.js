import CreateElement from '../../../lib/CreateElement.js';
import STRINGS from '../../../constant/STRINGS.js';

const TodoInput = () => {
  const dom = CreateElement('section', { className: 'input-container'});

  const render = () => {
    dom.innerHTML = `
      <input class="new-todo" placeholder="${STRINGS.todoInputPlaceHolder}" autofocus />
    `;
  };
  render();

  return dom;
};

export default TodoInput;