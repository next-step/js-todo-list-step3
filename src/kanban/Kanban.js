import localStorage from '../utils/localStorage.js';
import { handleTodoList } from './handler/handleTodoList.js';

const init = () => {
  const $teamName = document.querySelector('#team-name');
  const $todoListContainer = document.querySelector('.todoapp-list-container');

  const currentTeam = localStorage.get('currentTeam');
  $teamName.innerText = currentTeam.name;

  $todoListContainer.addEventListener('click', handleTodoList);
};

export const Kanban = () => {
  init();
};

window.addEventListener('DOMContentLoaded', Kanban);
