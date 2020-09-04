import {getTeams, addTeam} from './Api.js';

function Team() {
  const $teamListContainer = document.querySelector('.team-list-container');
  this.teams = [];

  this.init = async () => {
    this.teams = await getTeams();
    this.render();

    const $addTeamButton = document.querySelector('#add-team-button');
    $addTeamButton.addEventListener('click', async (e) => {
      const result = prompt('팀 이름을 입력해주세요');
      await addTeam(result);

      this.teams = await getTeams();
      this.render();
    });
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

    $teamListContainer.innerHTML = result +
    `<div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  };

  this.init();
}

new Team();
