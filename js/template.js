export const addTeamButtonContainer = `
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </div>
    `;

export const teamCardContainer = (_id, name) => `
    <div class="team-card-container" id="${_id}">
      <a href="/kanban.html" class="card">
        <div class="card-title">${name}</div>
      </a>
    </div>
    `;
