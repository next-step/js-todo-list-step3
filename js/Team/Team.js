import { teamTemplate, todoListTemplateHTML } from '../Template.js';
import { loadTeam } from './LoadTeam.js';
import './AddUser.js';
import { renderTodoList } from './TodoList.js';
import { addTodoItemEvent } from './AddTodoItem.js';
import { deleteTodoItemEvent } from './DeleteTodoItem.js';
import { deleteTodoItemAllEvent } from './DeleteTodoItemAll.js';
import { modifyContentsEvent } from './ModifyContents.js';
import { toggleTodoItemEvent } from './ToggleTodoItem.js';
import { setPriorityEvent } from './SetPriority.js';

export let team = teamTemplate;
export const teamID = window.location.hash.substr(1, 9);
team._id = teamID;
let users = [];

const $teamTitle = document.querySelector('#user-title').querySelector('strong');
const $addUserButtonContainer = document.querySelector('.add-user-button-container');

window.onload = () => {
  getTeam();
}

export const getTeam = async () => {
  team = await loadTeam(teamID);
  users = team.members;
  $teamTitle.innerText = team.name;
  clearRenderedUserList();
  renderUserList();
  users.forEach(renderTodoList);
  addTodoItemEvent();
  deleteTodoItemEvent();
  deleteTodoItemAllEvent();
  modifyContentsEvent();
  toggleTodoItemEvent();
  setPriorityEvent();
}

const clearRenderedUserList = () => {
  const todoappContainer = document.querySelectorAll('.todoapp-container');
  todoappContainer.forEach(user => user.remove());
}

const renderUserList = () => {
  users.forEach(user => { $addUserButtonContainer.insertAdjacentHTML('beforebegin', todoListTemplateHTML(user)); });
}