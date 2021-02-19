import { changePriority } from '../components/todo/changePriority.js';

export const onPriorityTodo = ({ target }, currentTeam) => {
  if (!target.classList.contains('chip')) {
    return;
  }

  changePriority(target, currentTeam);
};
