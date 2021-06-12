// import team from '@api/team.js';

// const $addTeamButton = document.querySelector('#add-team-button');
// $addTeamButton.addEventListener('click', () => {
//   const result = prompt('팀 이름을 입력해주세요');
// });

import TeamApp from '@components/TeamApp.js';

function handleLoadAfter() {
  new TeamApp();
}

window.addEventListener('load', handleLoadAfter);
