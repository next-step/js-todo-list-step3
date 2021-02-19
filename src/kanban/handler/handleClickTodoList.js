import { addMember } from '../components/member/addMember.js';
import { deleteTodo } from '../components/todo/deleteTodo.js';
import { deleteTodos } from '../components/todo/deleteTodos.js';

const isContain = (target, className) => target.classList.contains(className);

export const handleClickTodoList = ({ target }, currentTeam) => {
  if (isContain(target, 'ripple') || isContain(target, 'material-icons')) {
    addMember(currentTeam);
    return;
  }
  if (isContain(target, 'destroy')) {
    deleteTodo(target, currentTeam);
    return;
  }
  if (isContain(target, 'clear-completed')) {
    deleteTodos(target, currentTeam);
  }
};
