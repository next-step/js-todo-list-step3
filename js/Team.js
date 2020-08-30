import {getTeams} from './Api.js';

function Team() {
  const $teamListContainer = document.querySelector('.team-list-container');
  const $addTeamButton = document.querySelector('#add-team-button');
  this.teams = [];

  this.init = async () => {
    this.teams = await getTeams();
    this.render();
  };

  this.render = () => {
    let result = '';
    this.teams.map(({_id, name, members}) => {
      result += 
      `<div class="team-card-container">
        <a href="/kanban.html" class="card">
          <div class="card-title">${name}</div>
        </a>
      </div>`;
    }).join('');

    $teamListContainer.innerHTML = result;
  };

  $addTeamButton.addEventListener('click', () => {
    const result = prompt('팀 이름을 입력해주세요');
  });

  this.init();
}

new Team();
