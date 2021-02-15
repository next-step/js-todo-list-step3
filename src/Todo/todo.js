import { $todoApps } from '../dom.js';
import { todoInput } from './todoInput.js';
import { loadTodo } from './loadTodo.js';
import { removeTodo, removeAllTodo } from './removeTodo.js';
import { addMember } from './addMember.js';
import { completeTodo } from './completeTodo.js';
import { editTodo } from './editTodo.js';
import { setPriority } from './setPriority.js';

export const teamId = location.hash.substr(1, 9);

export const todo = async () => {
  await loadTodo();

  $todoApps.addEventListener('keyup', todoInput);
  $todoApps.addEventListener('click', clickEventHandler);
  $todoApps.addEventListener('dblclick', editTodo);
};

todo();

const clickEventHandler = ({ target }) => {
  const targetClass = target.classList.item(0);

  if (targetClass === 'toggle') {
    completeTodo(target);
  } else if (targetClass === 'chip') {
    setPriority(target);
  } else if (targetClass === 'destroy') {
    removeTodo(target);
  } else if (targetClass === 'clear-completed') {
    removeAllTodo(target);
  } else if (targetClass === 'ripple') {
    addMember(target);
  } else {
    return;
  }
};

export const getItemId = (target) => {
  return target.closest('li').dataset.itemid;
};

export const getMemberId = (target) => {
  return target.closest('.todoapp-container').dataset.memberid;
};

export const getTodoItem = (target) => {
  return target.closest('.todo-list-item');
};
