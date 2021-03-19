import store from './store.js';

function teamComponent() {
  const $container = document.querySelector('.team-list-container');
  const $addTeamButton = createAddTeamButton();
  const _store = store($container);

  function onClickAddTeamButtonEvent({ target }) {
    const result = prompt('팀 이름을 입력해주세요');

    _store.createTeam(result);
  }

  function createTeamCardElement(team) {
    const $div = document.createElement('div');
    $div.classList.add('team-card-container');
    $div.dataset.id = team._id;

    const $a = document.createElement('a');
    $a.classList.add('card');
    $a.href = '/kanban.html'; //TODO

    const $innerDiv = document.createElement('div');
    $innerDiv.classList.add('card-title');
    $innerDiv.textContent = team.name;

    $div.appendChild($a);
    $a.appendChild($innerDiv);

    return $div;
  }

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

  function render(teams = []) {
    $container.innerHTML = '';
    teams
      .map((team) => createTeamCardElement(team))
      .forEach((teamCard) => $container.appendChild(teamCard));
    $container.appendChild($addTeamButton);
  }

  $container.addEventListener('render', (e) => render(e.detail));
  $addTeamButton.addEventListener('click', onClickAddTeamButtonEvent);

  async function init() {
    await _store.fetchTeamList();
  }

  return {
    init,
  };
}

teamComponent().init();
