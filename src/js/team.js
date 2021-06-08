const $addTeamButton = document.querySelector('#add-team-button')
$addTeamButton.addEventListener('click', () => {
  const result = prompt('팀 이름을 입력해주세요');

  const newTeam = document.createElement('div');
  newTeam.classList.add('team-card-container');
  newTeam.innerHTML = '<a href="/kanban.html" class="card">' 
                    + '<div class="card-title">' + result + '</div>'
                    + '</a>';

  $addTeamButton.parentNode.before(newTeam);
})