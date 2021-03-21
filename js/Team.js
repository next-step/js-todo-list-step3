// const $addTeamButton = document.querySelector('#add-team-button')
// $addTeamButton.addEventListener('click', () => {
//   const result = prompt('팀 이름을 입력해주세요')
// })
import Team from './components/Team.js';

new Team(document.querySelector('#app'));
