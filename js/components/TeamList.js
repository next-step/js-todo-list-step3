const renderTeamItem = ({ _id, name }) => `
  <div class="team-card-container">
    <a href="/kanban.html?team-id=${_id}" class="card">
      <div class="card-title">${name}</div>
    </a>
  </div>
`;

export default function TeamList(listEl, teamApp) {
  this.createTeam = async ({ target }) => {
    if (!target.classList.contains("ripple")) {
      return;
    }

    const name = prompt("추가하고 싶은 팀 이름을 입력해주세요.").trim();
    if (name.length < 2) {
      alert("이름은 최소 2글자 이상이어야 합니다.");
      return;
    }

    teamApp.createTeam(name);
  };

  this.render = () => {
    listEl.innerHTML = `
      ${teamApp.teams.map(renderTeamItem).join("")}
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  };

  listEl.addEventListener("click", this.createTeam);
}
