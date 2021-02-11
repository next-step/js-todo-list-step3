import { api } from '../api.js';
import { teamId } from './todo.js';

export const removeTodo = async ({ target }) => {
  if (!target.classList.contains('destroy')) return;

  const itemId = target.closest('li').dataset.itemid;
  const memberId =
    target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
      .dataset.memberid;

  await api.deleteTodo(teamId, memberId, itemId);

  target.closest('li').remove();
};
