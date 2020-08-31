export const teamTitleHTML = (name) => `
  <span><strong>${name}</strong>'s Todo List</span>
`;

export const teamCardHTML = (team) => `
  <div id=${team._id} class="team-card-container">
    <a href="./kanban.html?${team._id}" class="card">
      <span class="card-title">${team.name} TEAM</span>
      <button>
        <span class="material-icons delete">delete</span>
      </button>
    </a>
  </div>`;

export const addTeamButtonHTML = () => `
  <div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>
`;
