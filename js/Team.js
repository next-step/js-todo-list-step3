import { teamTemplate, todoListTemplateHTML } from './Template.js';

import { loadTeam } from './LoadTeam.js';
import { } from './AddUser.js';
import { renderTodoList } from './TodoList.js';
import { addTodoItemEvent } from './AddTodoItem.js';
import { deleteTodoItemEvent } from './DeleteTodoItem.js';
import { deleteTodoItemAllEvent } from './DeleteTodoItemAll.js';

export let team = teamTemplate;
export const teamID = window.location.hash.substr(1, 9);
team._id = teamID;
let users = [];

const $teamTitle = document.querySelector('h1#user-title');
// const $todoApps = document.querySelector('.todoapp-list-container');
const $addUserButtonContainer = document.querySelector('li.add-user-button-container');

window.onload = () => {
  getTeam();
}

export const getTeam = async () => {
  team = await loadTeam(team);
  users = team.members;
  $teamTitle.innerHTML = `<span><strong>${team.name}</strong>'s Todo List</span>`
  clearRenderedUserList();
  renderUserList();
  users.forEach(renderTodoList);
  addTodoItemEvent();
  deleteTodoItemEvent();
  deleteTodoItemAllEvent();
}

const clearRenderedUserList = () => {
  const todoappContainer = document.querySelectorAll('li.todoapp-container');
  todoappContainer.forEach(user => user.remove());
}

const renderUserList = () => {
  users.forEach(user => { $addUserButtonContainer.insertAdjacentHTML('beforebegin', todoListTemplateHTML(user)); });
}

// $todoApps.addEventListener('click', event => notUnderstoodYet(event));

// const notUnderstoodYet = event => {
//   const $target = event.target;
//   const targetClassList = $target.classList;
//   if (targetClassList.contains('chip')) {
//     const $chipSelect = $target.closest('.chip-container').querySelector('select');
//     $target.classList.add('hidden');
//     $chipSelect.classList.remove('hidden');
//   }
// }