import { teamStore } from './store.js';
import { TEAM_EVENTS } from './appEvents.js';

function createAddTeamButton() {
  const $div = document.createElement('div');
  $div.classList.add('add-team-button-container');

  const $button = document.createElement('button');
  $button.id = 'add-team-button';
  $button.classList.add('ripple');

  const $span = document.createElement('span');
  $span.classList.add('material-icons');
  $span.textContent = 'add';

  $div.appendChild($button);
  $button.appendChild($span);

  return $div;
}

function createTeamCardElement(team) {
  const $div = document.createElement('div');
  $div.classList.add('team-card-container');
  $div.dataset.id = team._id;

  const $a = document.createElement('a');
  $a.classList.add('card');
  const searchParams = new URLSearchParams(); //TODO
  searchParams.append('team', team._id);
  $a.href = '/kanban.html?' + searchParams.toString();

  const $innerDiv = document.createElement('div');
  $innerDiv.classList.add('card-title');
  $innerDiv.textContent = team.name;

  $div.appendChild($a);
  $a.appendChild($innerDiv);

  return $div;
}

function teamComponent() {
  const $container = document.querySelector('.team-list-container');
  const $addTeamButton = createAddTeamButton();
  const store = teamStore($container);

  function onClickAddTeamButtonEvent() {
    const result = prompt('팀 이름을 입력해주세요');

    store.createTeam(result);
  }

  function render(teams = []) {
    $container.innerHTML = '';
    $container.appendChild($addTeamButton);
    $addTeamButton.before(...teams.map((team) => createTeamCardElement(team)));
  }

  $container.addEventListener(TEAM_EVENTS.RENDER, (e) => render(e.detail)); //TODO
  $addTeamButton.addEventListener('click', onClickAddTeamButtonEvent);

  async function init() {
    await store.fetchTeamList();
  }

  return {
    init,
  };
}

teamComponent().init();
