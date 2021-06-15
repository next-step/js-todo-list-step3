import { changePriorityToNumber } from './changePriorityToNumber';

export const sortTodo = (todoList) => {
  const newTodoList = todoList.slice();
  return newTodoList.sort((a, b) => {
    const A = changePriorityToNumber(a.priority);
    const B = changePriorityToNumber(b.priority);
    return A - B;
  });
};
