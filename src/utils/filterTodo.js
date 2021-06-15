import Mode from '@/constant/todoFilter';
import { sortTodo } from './sortTodo';

export const filterTodo = (mode, todoList) => {
  if (mode === Mode.ALL) return todoList;
  if (mode === Mode.PRIORITY) return sortTodo(todoList);
  if (mode === Mode.ACTIVE) return todoList.filter((todo) => !todo.isCompleted);
  if (mode === Mode.COMPLETED)
    return todoList.filter((todo) => todo.isCompleted);
};
