import { template } from '../template.js';

export const todoInput = ({ target, key }) => {
  if (!target.classList.contains('new-todo')) return;

  if (target.value && key === 'Enter') {
    const $todoList = target.closest('div').querySelector('ul');
    console.log($todoList);

    //일단은 이렇게 만드는데 전체 로직상 새로 로드하는 코드로 변경해야함
    $todoList.insertAdjacentHTML('beforeend', template.todoItem(target.value));

    target.value = '';
  }
};
