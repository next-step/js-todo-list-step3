const renderTeamItem = ({ _id, name }) => `
  <div class="team-card-container" data-id="${_id}">
    <a href="/kanban.html" class="card">
      <div class="card-title">${name}</div>
    </a>
  </div>
`;

export default function TeamApp(listEl, teamList) {
  this.render = () => {
    listEl.innerHTML = `
      ${teamList.teams.map(renderTeamItem).join("")}
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>`;
  };
}
