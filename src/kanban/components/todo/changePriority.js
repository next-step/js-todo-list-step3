import { api } from '../../../api/api.js';
import { renderTodo } from '../render/renderTodo.js';

const getPriorityContent = (value) => {
  const priorityList = {
    1: 'FIRST',
    2: 'SECOND',
    0: 'NONE',
  };
  return priorityList[value];
};

export const changePriority = async (target, currentTeam) => {
  const teamId = currentTeam.id;
  const memberId = target.closest('.todoapp-container').id;
  const itemId = target.closest('li').id;
  const priority = getPriorityContent(target.value);

  try {
    await api.setPriorityMemberTodo(teamId, memberId, itemId, priority);
    const member = await api.getMember(teamId, memberId);
    renderTodo(memberId, member.todoList);
  } catch (err) {
    throw new Error(err);
  }
};
