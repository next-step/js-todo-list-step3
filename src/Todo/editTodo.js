import { template } from '../template.js';
import { api } from '../api.js';
import { teamId } from './todo.js';

export const editTodo = ({ target }) => {
  if (!target.classList.contains('label')) return;

  const $todoList = target.closest('li');
  const $edit = $todoList.querySelector('.edit');

  $edit.addEventListener('keyup', endInput);
  $todoList.classList.toggle('editing');
};

const endInput = ({ target, key }) => {
  const value = target.value;
  const $list = target.closest('li');

  if (key === 'Escape') {
    cancelEdit($list, target, value);
  } else if (key === 'Enter') {
    saveEdit($list, target);
  }
};

const cancelEdit = ($list, target, value) => {
  $list.classList.remove('editing');
  target.value = value;
};

const saveEdit = async ($list, target) => {
  const $label = $list.querySelector('.label');
  const itemId = $list.dataset.itemid;
  const memberId = target.closest('.todoapp-container').dataset.memberid;
  const contents = {
    contents: target.value,
  };

  $list.classList.remove('editing');
  $label.innerText = target.value;
  $label.insertAdjacentHTML('afterbegin', template.chipContainer());

  await api.editTodo(teamId, memberId, itemId, contents);
};
