import { api } from '../../../api/api.js';
import { isContain } from '../../../utils/validator.js';
import { renderTodo } from '../render/renderTodo.js';

const selectTarget = (target) => {
  target
    .closest('ul')
    .querySelectorAll('a')
    .forEach((target) => target.classList.remove('selected'));
  target.classList.add('selected');
};

const getCurrentOption = (target) => {
  if (isContain(target, 'all')) {
    return 'all';
  }
  if (isContain(target, 'active')) {
    return 'active';
  }
  if (isContain(target, 'completed')) {
    return 'completed';
  }
};

const filterTodoList = (todoList, currentOption) => {
  const option = {
    all: () => true,
    active: (item) => item.isCompleted === false,
    completed: (item) => item.isCompleted === true,
  };

  return todoList.filter((item) => option[currentOption](item));
};

export const filterTodo = async (target, currentTeam) => {
  const teamId = currentTeam.id;
  const memberId = target.closest('.todoapp-container').id;
  const currentOption = getCurrentOption(target);

  try {
    const member = await api.getMember(teamId, memberId);
    const todos = filterTodoList(member.todoList, currentOption);
    renderTodo(memberId, todos);
  } catch (err) {
    throw new Error(err);
  }
  selectTarget(target);
};
