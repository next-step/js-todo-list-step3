import { FILTER_NAME, ERROR_TYPE } from './constants.js';

export const backToOriginalToggle = (target) => {
  target.classList.remove('editing');
  if (target.querySelector('.toggle').checked) {
    target.classList.add('completed');
    return;
  }
};

export const filteringTodoList = (todoList, hash) => {
  if (!todoList) return;
  const selectAction = {
    [FILTER_NAME.PRIORITY]: (data) => {
      const noPriorityLength = data.filter((todo) => todo.priority === 0)
        .length;
      const preSortedArray = data.sort(
        (a, b) => parseInt(a.priority) - parseInt(b.priority),
      );
      const noPriorityArray = preSortedArray.splice(0, noPriorityLength);
      return preSortedArray.concat(noPriorityArray);
    },
    [FILTER_NAME.ALL]: (data) => data,
    [FILTER_NAME.ACTIVE]: (data) =>
      data.filter((todo) => todo.isCompleted === false),
    [FILTER_NAME.COMPLETED]: (data) =>
      data.filter((todo) => todo.isCompleted === true),
  };
  return selectAction[hash]
    ? selectAction[hash](todoList)
    : console.error(ERROR_TYPE.NO_MATCH_HASH);
};
