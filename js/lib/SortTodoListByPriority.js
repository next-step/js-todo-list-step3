import { getter } from '../store/team.js';
import PRIORITY from '../constant/PRIORITY.js';

const SortTodoListByPriority = (memberId) => {
  const todoList = getter.memberTodoList(memberId);
  todoList.sort((a, b) => PRIORITY[a.priority].index - PRIORITY[b.priority].index)
  return todoList;
};


export default SortTodoListByPriority;