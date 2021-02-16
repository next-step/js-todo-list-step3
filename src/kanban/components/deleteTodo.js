import { api } from '../../api/api.js';
import { renderMemberTodo } from './renderMemberTodo.js';

export const deleteTodo = async (target, currentTeam) => {
  const teamId = currentTeam.id;
  const itemId = target.closest('li').id;
  const memberId = target.closest('.todoapp-container').id;

  console.log(teamId, memberId, itemId);

  try {
    await api.deleteMemberTodo(teamId, memberId, itemId);
    const member = await api.getMember(teamId, memberId);
    renderMemberTodo(memberId, member.todoList);
  } catch (err) {
    throw new Error(err);
  }
};
