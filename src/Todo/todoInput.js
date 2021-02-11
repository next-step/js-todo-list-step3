import { $todoApps } from '../dom.js';
import { template } from '../template.js';

export const todoInput = ({ target, key }) => {
  if (!target.classList.contains('new-todo')) return;

  if (target.value && key === 'Enter') {
    const $todoList = target.closest('div').querySelector('ul');
    $todoList.insertAdjacentHTML('beforeend', template.todoItem(target.value));

    target.value = '';

    //api로 서버에 저장하기
  }
};
