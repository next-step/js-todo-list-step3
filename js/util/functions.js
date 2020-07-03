import { FILTER_NAME, ERROR_TYPE } from './constants.js';

export const backToOriginalToggle = (target) => {
  target.classList.remove('editing');
  if (target.querySelector('.toggle').checked) {
    target.classList.add('completed');
    return;
  }
};

export const filteringTodoList = (hash, todoList) => {
  if (!todoList) return;
  const selectAction = {
    [FILTER_NAME.PRIORITY]: () => {},
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
