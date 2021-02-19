import { isContain } from '../../utils/validator.js';
import { addTodo } from '../components/todo/addTodo.js';
import { editTodo } from '../components/todo/editTodo.js';

export const handleInputTodoList = ({ target, key }, currentTeam) => {
  if (isContain(target, 'new-todo')) {
    addTodo(target, key, currentTeam);
    return;
  }
  if (isContain(target, 'edit')) {
    editTodo(target, key, target.value, currentTeam);
  }
};
