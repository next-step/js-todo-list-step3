import { Action } from '../../action/Action.js';
import { $, $$ } from '../../util/domSelection.js';

export class TodoInput {
  constructor() {
    const $app = $('ul.todoapp-list-container');
    const teamId = $app.dataset.teamid;
    $app.addEventListener('keydown', async ({ target, key }) => {
      if (target.classList.contains('new-todo') && key === 'Enter') {
        const inputBox = target;
        const $todoList = target.closest('li.todoapp-container');
        const memberId = $todoList.dataset.memberid;
        await Action.addItem(teamId, memberId, inputBox.value);
        inputBox.value = '';
      }
    });
  }

  render($todoAppContainer) {
    const todoInputText = `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`;
    const [$inputContainer] = $$('section.input-container', $todoAppContainer);
    $inputContainer.innerHTML = '';
    $inputContainer.insertAdjacentHTML('afterBegin', todoInputText);
  }
}
