import { api } from '../api.js';
import { teamId, getItemId, getMemberId } from './todo.js';
import { resetCount } from './todoCount.js';

export const removeTodo = async ({ target }) => {
  if (!target.classList.contains('destroy')) return;

  const itemId = getItemId(target);
  const memberId = getMemberId(target);

  await api.deleteTodo(teamId, memberId, itemId);

  target.closest('li').remove();

  resetCount(memberId);
};
