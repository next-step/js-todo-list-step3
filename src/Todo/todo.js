import { $todoApps } from '../dom.js';
import { todoInput } from './todoInput.js';
import { loadTodo } from './loadTodo.js';
import { removeTodo } from './removeTodo.js';
import { addMember } from './addMember.js';
import { completeTodo } from './completeTodo.js';
export const teamId = location.hash.substr(1, 9);

export const todo = async () => {
  await loadTodo();

  $todoApps.addEventListener('keyup', todoInput);
  $todoApps.addEventListener('click', removeTodo);
  $todoApps.addEventListener('click', addMember);
  $todoApps.addEventListener('click', completeTodo);
};

todo();
