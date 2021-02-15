import { api } from '../../etc/api.js';
import { teamId, getItemId, getMemberId } from '../todo.js';
import { resetCount } from './todoCount.js';
import { showMessage } from '../../etc/validator.js';

export const removeTodo = async (target) => {
  const itemId = getItemId(target);
  const memberId = getMemberId(target);

  await api.deleteTodo(teamId, memberId, itemId);

  target.closest('li').remove();

  resetCount(memberId);
};

export const removeAllTodo = async (target) => {
  showMessage('정말 모든 투두리스트를 삭제하시겠습니까?');

  const $todoApp = target.closest('.todoapp');
  const $todoList = $todoApp.querySelector('.todo-list');
  const memberId = getMemberId($todoList);

  while ($todoList.firstChild) {
    const $Item = $todoList.lastChild;

    if ($Item !== null) {
      const itemId = $Item.dataset.itemid;

      await api.deleteTodo(teamId, memberId, itemId);
      $Item.remove();
    }
  }
};
