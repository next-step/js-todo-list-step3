import MemberApp from './MemberApp.js';

const parsedUrl = new URL(window.location.href);
const teamName = parsedUrl.searchParams.get('name');
const teamId = parsedUrl.searchParams.get('id');

new MemberApp({ 
  teamName,
  teamId,
  $targetTeamTitle: document.querySelector('#user-title'),
  $targetTodoAppListContainer: document.querySelector('.todoapp-list-container')
});
