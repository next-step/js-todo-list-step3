import { CLASS_NAME, PRIORITY, MESSAGE } from './constants.js';

export const getSelectedTabTodos = (todos, selectedTab) => {
  switch (selectedTab) {
    case CLASS_NAME.ALL:
      return todos;

    case CLASS_NAME.PRIORITY:
      return getSortedTodos(todos);

    case CLASS_NAME.ACTIVE:
      return todos.filter((todo) => !todo.isCompleted);

    case CLASS_NAME.COMPLETED:
      return todos.filter((todo) => todo.isCompleted);

    default:
      console.error(`${selectedTab} : ${MESSAGE.UNDEFINED_TAB}`);
      return todos;
  }
};

const getSortedTodos = (todos) => {
  const sortedTodos = [];

  const newTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.priority]) {
      acc[todo.priority] = [];
    }
    acc[todo.priority].push(todo);
    return acc;
  }, {});

  for (const value of Object.entries(newTodos)) {
    const [priority, todos] = value;
    if (Number(priority) === PRIORITY.NONE) continue;
    sortedTodos.push(...todos);
  }

  if (newTodos[PRIORITY.NONE]) {
    sortedTodos.push(...newTodos[PRIORITY.NONE]);
  }

  return sortedTodos;
};
