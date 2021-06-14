import TeamApp from '@components/TeamApp.js';

function handleLoadAfter() {
  new TeamApp();
}

window.addEventListener('load', handleLoadAfter);
