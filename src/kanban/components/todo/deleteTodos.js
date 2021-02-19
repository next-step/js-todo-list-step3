import { api } from '../../../api/api.js';
import { renderTodo } from './renderTodo.js';

export const deleteTodos = async (target, currentTeam) => {
  const teamId = currentTeam.id;
  const memberId = target.closest('.todoapp-container').id;
  const confirm = window.confirm(
    '정말로 해당 유저의 모든 TodoList를 지우시겠습니까?',
  );

  if (!confirm) {
    return;
  }

  try {
    await api.deleteMemberTodos(teamId, memberId);
    const member = await api.getMember(teamId, memberId);
    renderTodo(memberId, member.todoList);
  } catch (err) {
    throw new Error(err);
  }
};
