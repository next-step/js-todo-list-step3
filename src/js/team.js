import { $, $$, METHOD, API } from './util.js';

const $teamList = $('.team-list-container');

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
      <a id=${team._id} href="#" class="card">
      <div class="card-title">${team.name}</div>
      </a>
      </div>
    `;

  return teamCard;
};

const renderTeams = teams => {
  const teamList = teams.map(team => teamTemplate(team));
  $teamList.innerHTML = teamList.join('') + addBtn;
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

const addTeam = (name, { TEAMS }, { POST }) => {
  fetch(TEAMS, {
    method: POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      loadTeams(API);
    })
    .catch(error => console.log(error))
};

$teamList.addEventListener('click', ({ target }) => {
  if (target.className === 'ripple') {
    const result = prompt('팀 이름을 입력해주세요')
    if (result) addTeam(result, API, METHOD);
  } else if (target.className === 'card') {
    location.href = `/kanban.html?id=${target.id}`;
  }
});

loadTeams(API);