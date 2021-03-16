const addTeamButtonTemplate = () => {
  return `<div class="add-team-button-container">
              <button id="add-team-button" class="ripple">
                <span class="material-icons">add</span>
              </button>
            </div>`;
};

const deleteTeamButtonTemplate = () => {
  return `<div class="delete-team-button-container">
              <button id="delete-team-button" class="ripple">
                <span class="material-icons">delete</span>
              </button>
            </div>`;
};

const teamCardTemplate = ({ _id, name }) => {
  return `<div class="team-card-container" id="${_id}">
              <a href="kanban.html" class="card">
                <div class="card-title">${name}</div>
              </a>
            </div>`;
};

export const renderTeam = (teams) => {
  const $teamListContainer = document.querySelector('.team-list-container');

  $teamListContainer.innerHTML =
    teams.map((team) => teamCardTemplate(team)).join('') +
    addTeamButtonTemplate() +
    deleteTeamButtonTemplate();
};
