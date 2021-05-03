import { Action } from '../../action/Action.js';
import { $, $$ } from '../../util/domSelection.js';

const $app = $('ul.todoapp-list-container');
const _addItem = async ({ target, key }) => {
  if (target.classList.contains('new-todo') && key === 'Enter') {
    const inputBox = target;
    const $todoList = target.closest('li.todoapp-container');
    const teamId = $app.dataset.teamid;
    const memberId = $todoList.dataset.memberid;
    await Action.addItem(teamId, memberId, inputBox.value);
    inputBox.value = '';
  }
};
export class TodoInput {
  constructor() {
    $app.addEventListener('keydown', _addItem);
  }

  render($todoAppContainer) {
    const todoInputText = `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`;
    const [$inputContainer] = $$('section.input-container', $todoAppContainer);
    $inputContainer.innerHTML = '';
    $inputContainer.insertAdjacentHTML('afterBegin', todoInputText);
  }
}
