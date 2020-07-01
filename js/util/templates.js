export const TeamListTemplate = (teamList) =>
  teamList
    .map(
      (team) => `
          <div class="team-card-container">
            <a href="/kanban.html" class="card">
              <div class="card-title">
                ${team.name}
              </div>
            </a>
          </div>
    `,
    )
    .join('').concat(`
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>`);
