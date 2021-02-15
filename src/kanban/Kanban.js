import localStorage from '../utils/localStorage.js';
import { loadMembers } from './components/loadMembers.js';
import { handleClickTodoList } from './handler/handleClickTodoList.js';
import { handleInputTodoList } from './handler/handleInputTodoList.js';

const init = () => {
  const $teamName = document.querySelector('#team-name');
  const $todoListContainer = document.querySelector('.todoapp-list-container');
  const currentTeam = localStorage.get('currentTeam');

  $teamName.innerText = currentTeam.name;
  $todoListContainer.addEventListener('click', (event) =>
    handleClickTodoList(event, currentTeam),
  );
  $todoListContainer.addEventListener('keyup', (event) =>
    handleInputTodoList(event, currentTeam),
  );
};

export const Kanban = async () => {
  await loadMembers();
  init();
};

window.addEventListener('DOMContentLoaded', Kanban);
