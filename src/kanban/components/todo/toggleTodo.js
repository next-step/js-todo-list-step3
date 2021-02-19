import { api } from '../../../api/api.js';
import { renderTodo } from './renderTodo.js';

export const toggleTodo = async (target, currentTeam) => {
  const teamId = currentTeam.id;
  const itemId = target.closest('li').id;
  const memberId = target.closest('.todoapp-container').id;

  try {
    await api.toggleMemberTodo(teamId, memberId, itemId);
    const member = await api.getMember(teamId, memberId);
    renderTodo(memberId, member.todoList);
  } catch (err) {
    throw new Error(err);
  }
};
