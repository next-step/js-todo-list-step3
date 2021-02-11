export const template = {
  cardContainer: (teamName, teamId) => {
    return `<div class="team-card-container" data-userid="${teamId}">
        <a class="card">
          <div class="card-title">
            ${teamName}
          </div>
          <button class="destroy"></button>
        </a>
      </div>`;
  },

  addTeamButton: () => {
    return `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>`;
  },

  todoItem: (contents) => {
    return `<li class="todo-list-item">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">
        <div class="chip-container">
          <select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        </div>
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`;
  },

  addMemberButton: () => {
    return `<li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>`;
  },
};
