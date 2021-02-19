import { isContain } from '../../utils/validator.js';
import { addMember } from '../components/member/addMember.js';
import { deleteTodo } from '../components/todo/deleteTodo.js';
import { deleteTodos } from '../components/todo/deleteTodos.js';
import { filterTodo } from '../components/todo/filterTodo.js';
import { toggleTodo } from '../components/todo/toggleTodo.js';

export const handleClickTodoList = ({ target }, currentTeam) => {
  if (isContain(target, 'ripple') || isContain(target, 'material-icons')) {
    addMember(currentTeam);
    return;
  }
  if (isContain(target, 'filter')) {
    filterTodo(target, currentTeam);
    return;
  }
  if (isContain(target, 'destroy')) {
    deleteTodo(target, currentTeam);
    return;
  }
  if (isContain(target, 'toggle')) {
    toggleTodo(target, currentTeam);
    return;
  }
  if (isContain(target, 'clear-completed')) {
    deleteTodos(target, currentTeam);
  }
};
