import { FILTER } from '@constants/constants.js';

function changePriorityToNumber(priority) {
  if (priority === 'FIRST') return 1;
  if (priority === 'SECOND') return 2;
  if (priority === 'NONE') return 3;
}

function comparePriority(todoItem1, todoItem2) {
  const priority1 = changePriorityToNumber(todoItem1.priority);
  const priority2 = changePriorityToNumber(todoItem2.priority);

  return priority1 - priority2;
}

export function getFilteredTodoList(todoList, filter = 'all') {
  return {
    [FILTER.ALL]: todoList,
    [FILTER.ACTIVE]: todoList.filter((todoItem) => !todoItem.isCompleted),
    [FILTER.COMPLETED]: todoList.filter((todoItem) => todoItem.isCompleted),
    [FILTER.PRIORITY]: [...todoList].sort(comparePriority),
  }[filter];
}
