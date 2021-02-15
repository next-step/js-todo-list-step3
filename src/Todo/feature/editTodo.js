import { template } from '../../etc/template.js';
import { api } from '../../etc/api.js';
import { teamId, getItemId, getMemberId, getTodoItem } from '../todo.js';

export const editTodo = ({ target }) => {
  if (!target.classList.contains('label')) return;

  const $todoItem = getTodoItem(target);
  const $edit = $todoItem.querySelector('.edit');

  $todoItem.classList.toggle('editing');
  $edit.addEventListener('keyup', endInput);
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
  const itemId = getItemId(target);
  const memberId = getMemberId(target);
  const contents = {
    contents: target.value,
  };

  $list.classList.remove('editing');
  $label.innerText = target.value;
  $label.insertAdjacentHTML('afterbegin', template.chipContainer());

  await api.editTodo(teamId, memberId, itemId, contents);
};
