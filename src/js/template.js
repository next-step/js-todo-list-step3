const makeAddTeamButton = `
  <div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
    </button>
  </div>
`;

const makeTeamCardContainer = function (item) {
  return `<div class="team-card-container">
            <a id="${item.id}" href="/kanban.html" class="card">
                <div class="card-title">
                    ${item.name}
                </div>
            </a>
        </div>
    `;
};

export { makeAddTeamButton, makeTeamCardContainer };
