import { api } from '../../api/api.js';
import { ERR_MSG } from '../../utils/constant.js';

export const addMemberTodo = async (target, key, currentTeam) => {
  if (key !== 'Enter' || !target.value) {
    return;
  }

  const newTodo = target.value.trim();

  if (!newTodo) {
    return alert(ERR_MSG.NOT_ALLOW_BLACK);
  }

  const memberId = target.closest('li').id;
  const teamId = currentTeam.id;

  try {
    await api.addMemberTodo(teamId, memberId, newTodo);
  } catch (err) {
    throw new Error(err);
  }
};
