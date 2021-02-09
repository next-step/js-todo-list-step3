export const template = {
  cardContainer: (teamName, teamId) => {
    return `<div class="team-card-container" data-userid="${teamId}">
        <a href="/kanban.html" class="card">
          <div class="card-title">
            ${teamName}
          </div>
          <button class="destroy"></button>
        </a>
      </div>`;
  },

  addButton: () => {
    return `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>`;
  },
};
