export const teamCardTemplate = (teamName, teamId) => {
    return `<div id="${teamId}" class="team-card-container">
                <a href="/kanban.html?${teamId}" class="card">
                <div class="card-title">
                    ${teamName}
                </div>
                </a>
            </div>`;
};

export const addTeamButtonTemplate = () => {
    return `<div class="add-team-button-container">
                <button id="add-team-button" class="ripple">
                <span class="material-icons">add</span>
                </button>
            </div>`;
};
