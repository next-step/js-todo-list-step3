import { $, $$, METHOD, API } from './util.js';

const addBtn =
  `
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </div>
  `;

const teamTemplate = team => {
  const teamCard =
    `
      <div class="team-card-container">
      <a id=${team._id} href="/kanban.html" class="card">
      <div class="card-title">${team.name}</div>
      </a>
      </div>
    `;

  return teamCard;
};

const renderTeams = teams => {
  const $teamList = $('.team-list-container');
  const teamList = teams.map(team => teamTemplate(team));

  $teamList.innerHTML = teamList.join('') + addBtn;

  const $addTeamButton = $('#add-team-button');
  $addTeamButton.addEventListener('click', () => {
    const result = prompt('팀 이름을 입력해주세요')
  });
};

const loadTeams = async ({ TEAMS }) => {
  const teams = await fetch(TEAMS)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .catch(error => console.log(error))

  renderTeams(teams);
};

loadTeams(API);