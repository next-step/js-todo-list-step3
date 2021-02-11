import { api } from '../api.js';
import { $todoApps } from '../dom.js';
import { template } from '../template.js';
import { teamId } from './todo.js';

export const todoInput = ({ target, key }) => {
  if (!target.classList.contains('new-todo')) return;
  if (!target.value || key !== 'Enter') return;

  const addTodo = async () => {
    const $todoList = target.closest('div').querySelector('ul');
    const memberId = target.parentElement.parentElement.parentElement.dataset.userid;
    const todoContents = {
      contents: target.value,
    };

    $todoList.insertAdjacentHTML('beforeend', template.todoItem(target.value));
    await api.addTodo(teamId, memberId, todoContents);
  };

  addTodo();
  target.value = '';
};
