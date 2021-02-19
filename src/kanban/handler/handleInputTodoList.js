import { addTodo } from '../components/todo/addTodo.js';

export const handleInputTodoList = ({ target, key }, currentTeam) => {
  const event = {
    'new-todo': addTodo,
  };

  return (
    event[target.className] && event[target.className](target, key, currentTeam)
  );
};
