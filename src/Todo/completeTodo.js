import { api } from '../api.js';
import { teamId, getItemId, getMemberId, getTodoItem } from './todo.js';

export const completeTodo = async (target) => {
  const $todoItem = getTodoItem(target);
  const itemId = getItemId(target);
  const memberId = getMemberId(target);

  completeCheck(target, $todoItem);

  await api.toggleTodo(teamId, memberId, itemId);
};

export const completeCheck = (target, $todoItem) => {
  target.toggleAttribute('checked');
  $todoItem.classList.toggle('completed');
};
