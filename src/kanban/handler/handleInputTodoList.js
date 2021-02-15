import { addMemberTodo } from '../components/addMemberTodo.js';

export const handleInputTodoList = ({ target, key }, currentTeam) => {
  const event = {
    'new-todo': addMemberTodo,
  };

  return (
    event[target.className] && event[target.className](target, key, currentTeam)
  );
};
