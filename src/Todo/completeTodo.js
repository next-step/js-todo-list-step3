import { api } from '../api.js';
import { teamId } from './todo.js';

export const completeTodo = async ({ target }) => {
  if (!target.classList.contains('toggle')) return;

  const $todoItem = target.closest('li');
  $todoItem.classList.toggle('completed');

  //todoItem에 isCompleted 값 수정하는 코드 만들어야하는데
  // 이거 load할때 처리하는 코드도 추가해야겠네
  const itemId = target.parentElement.parentElement.dataset.itemid;
  const memberId =
    target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
      .dataset.memberid;

  const result = await api.toggleTodo(teamId, memberId, itemId);
  const isCompleted = result.isCompleted;
  console.log(result);
};
