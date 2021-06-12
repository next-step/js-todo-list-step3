import TodoApp from '@components/TodoApp.js';
import TeamApp from '@components/TeamApp.js';

function handleLoadAfter() {
  new TeamApp();
  // new TodoApp();
}

window.addEventListener('load', handleLoadAfter);
