import { addMember } from '../components/addTodo.js';

export const handleTodoList = ({ target }) => {
  const event = {
    ripple: addMember,
    'material-icons': addMember,
  };

  return event[target.className] && event[target.className]();
};
