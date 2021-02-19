import { api } from '../../../api/api.js';
import { renderTodo } from './renderTodo.js';

export const deleteTodo = async (target, currentTeam) => {
  const teamId = currentTeam.id;
  const itemId = target.closest('li').id;
  const memberId = target.closest('.todoapp-container').id;

  /**
   **  현재 Memeber의 Todo가 Delete가 안 됨
   */

  try {
    api.deleteMemberTodo(teamId, memberId, itemId);
    const member = await api.getMember(teamId, memberId);
    renderTodo(memberId, member.todoList);
  } catch (err) {
    throw new Error(err);
  }
};
