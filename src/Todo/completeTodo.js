import { api } from '../api.js';
import { teamId } from './todo.js';

export const completeTodo = async ({ target }) => {
  if (!target.classList.contains('toggle')) return;

  const $todoItem = target.closest('li');
  completeCheck(target, $todoItem);

  const itemId = target.closest('li').dataset.itemid;
  const memberId = target.closest('.todoapp-container').dataset.memberid;

  await api.toggleTodo(teamId, memberId, itemId);
};

export const completeCheck = (target, $todoItem) => {
  target.toggleAttribute('checked');
  $todoItem.classList.toggle('completed');
};
