import { api } from '../../api/api.js';

const addTeamButtonTemplate = () => {
  return `<div class="add-team-button-container">
            <button id="add-team-button" class="ripple">
              <span class="material-icons">add</span>
            </button>
          </div>`;
};

const teamCardTemplate = ({ _id, name }) => {
  return `<div class="team-card-container" id="${_id}">
            <a href="/kanban.html" class="card">
              <div class="card-title">${name}</div>
            </a>
          </div>`;
};

export const loadTeam = async () => {
  const $teamListContainer = document.querySelector('.team-list-container');

  try {
    const teams = await api.getTeams();
    if (teams.length) {
      $teamListContainer.innerHTML =
        teams.map((team) => teamCardTemplate(team)).join('') +
        addTeamButtonTemplate();
    }
  } catch (err) {
    throw new Error(err);
  }
};
