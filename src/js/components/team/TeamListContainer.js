export default class TeamListContainer {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <div class="team-card-container">
      <a href="/kanban.html" class="card">
        <div class="card-title">
          Team A
        </div>
      </a>
    </div>
    <div class="team-card-container">
      <a href="/kanban.html" class="card">
        <div class="card-title">
          Team B
        </div>
      </a>
    </div>
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </div>`;
  }
}
