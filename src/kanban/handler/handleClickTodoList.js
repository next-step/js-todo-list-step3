import { addMember } from '../components/member/addMember.js';
import { deleteTodo } from '../components/todo/deleteTodo.js';

const isContain = (target, className) => target.classList.contains(className);

export const handleClickTodoList = ({ target }, currentTeam) => {
  if (isContain(target, 'ripple') || isContain(target, 'material-icons')) {
    return addMember(currentTeam);
  }
  if (isContain(target, 'destroy')) {
    return deleteTodo(target, currentTeam);
  }
};
