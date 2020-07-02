import KanbanApp from './KanbanApp.js';

const parsedUrl = new URL(window.location.href);
const teamName = parsedUrl.searchParams.get('name');
const teamId = parsedUrl.searchParams.get('id');

new KanbanApp({ 
  teamName,
  teamId,
  $targetTeamTitle: document.querySelector('#user-title'),
  $targetTodoAppListContainer: document.querySelector('.todoapp-list-container')
});
