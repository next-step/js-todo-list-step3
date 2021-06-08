import { Action } from '../../action/Action.js';
import { $ } from '../../util/domSelection.js';

const $teamListContainer = $('div.team-list-container');
const _addTeamEvent = ({ target }) => {
  if (!target) return;
  if (target.nodeName === 'BUTTON' && target.id === 'add-team-button') {
    const teamName = prompt('팀 이름을 입력해주세요');
    Action.addTeam(teamName);
  }
};
export class TeamList {
  constructor() {
    const $refreshTeamButton = $('#refresh-team-list');
    $refreshTeamButton.addEventListener('click', Action.getTeams());
    $teamListContainer.addEventListener('click', _addTeamEvent);
  }

  render(teamList) {
    $teamListContainer.innerHTML = '';
    teamList.forEach((team) => {
      const teamCard = `<div class="team-card-container">
            <a href="/kanban.html?id=${team._id}" class="card">
                <div class="card-title">${team.name}</div>
            </a>
        </div>`;
      $teamListContainer.insertAdjacentHTML('beforeend', teamCard);
    });

    const addTeamButton = `<div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
        </button>
    </div>`;
    $teamListContainer.insertAdjacentHTML('beforeend', addTeamButton);
  }
}
