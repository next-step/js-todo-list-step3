import { api } from '../../../api/api.js';
import { ERR_MSG, TODO } from '../../../utils/constant.js';
import { renderTodo } from '../render/renderTodo.js';

const editTodoItem = async (target, currentTeam) => {
  const teamId = currentTeam.id;
  const itemId = target.closest('li').id;
  const memberId = target.closest('.todoapp-container').id;
  const newTodo = target.value;

  if (newTodo.length < TODO.MIN_TODO_LEN) {
    alert(ERR_MSG.TOO_SHORT_TODO_NAME_LEN);
    return;
  }

  try {
    await api.editMemberTodo(teamId, memberId, itemId, newTodo);
    const member = await api.getMember(teamId, memberId);
    renderTodo(memberId, member.todoList);
  } catch (err) {
    throw new Error(err);
  }
};

const revertTodoItem = (target, originalValue) => {
  target.value = originalValue;
  target.closest('li').classList.remove('editing');
};

export const editTodo = async (target, key, originalValue, currentTeam) => {
  if (key === 'Escape') {
    revertTodoItem(target, originalValue);
    return;
  }

  if (key === 'Enter') {
    editTodoItem(target, currentTeam);
  }
};
