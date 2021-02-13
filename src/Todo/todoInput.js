import { api } from '../api.js';
import { template } from '../template.js';
import { teamId, getMemberId } from './todo.js';

export const todoInput = ({ target, key }) => {
  if (!target.classList.contains('new-todo')) return;
  if (!target.value || key !== 'Enter') return;

  const addTodo = async () => {
    const $todoList = target.closest('div').querySelector('.todo-list');
    const memberId = getMemberId(target);
    const todoContents = {
      contents: target.value,
    };

    $todoList.insertAdjacentHTML('beforeend', template.todoItem(target.value, memberId));

    await api.addTodo(teamId, memberId, todoContents);
  };

  addTodo();
  target.value = '';
};
