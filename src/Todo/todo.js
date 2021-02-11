import { $todoApps } from '../dom.js';
import { todoInput } from './todoInput.js';
import { loadTodo } from './loadTodo.js';
import { removeTodo } from '../Todo/removeTodo.js';

export const teamId = location.hash.substr(1, 9);

export const todo = async () => {
  await loadTodo();

  $todoApps.addEventListener('keyup', todoInput);
  $todoApps.addEventListener('click', removeTodo);
};

todo();
