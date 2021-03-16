import { api } from '../../etc/api.js';
import { loadTodo } from '../loadTodo.js';
import { teamId, getMemberId } from '../todo.js';

export const todoInput = ({ target, key }) => {
  if (!target.classList.contains('new-todo')) return;
  if (!target.value || key !== 'Enter') return;

  const addTodo = async () => {
    const memberId = getMemberId(target);
    const todoContents = {
      contents: target.value,
    };

    await api.addTodo(teamId, memberId, todoContents);
    loadTodo();
  };

  addTodo();
};
