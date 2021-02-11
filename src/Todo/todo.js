import { todoInput } from './todoInput.js';
import { loadTodo } from './loadTodo.js';
import { $todoApps } from '../dom.js';

export const teamId = location.hash.substr(1, 9);

export const todo = async () => {
  await loadTodo();

  $todoApps.addEventListener('keyup', todoInput);
};

todo();
