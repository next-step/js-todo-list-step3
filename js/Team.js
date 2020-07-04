import { addTeam } from './api/index.js';

const $addTeamButton = document.querySelector('#add-team-button')
$addTeamButton.addEventListener('click', async () => {
  const teamName = prompt('팀 이름을 입력해주세요');
  const { result, error, errorMessage } = await addTeam(teamName);
  if (error) {
    alert(errorMessage);
    return;
  }
  console.log(result);
  // TODO: get team list
})
