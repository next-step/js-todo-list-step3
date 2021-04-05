'use strict';

export const teamBtnTemplate = team => {
  return `
  <div data-id=${team._id} class="team-card-container">
    <a class="card">
      <div class="card-title">${team.name}</div>
      <button class="destroy"></button>
    </a>
  </div>
  `;
};

export const teamAddBtnTemplate = () => {
  return `
  <div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>
  `;
};

export const kanbanTitleTemplate = teamName => {
  return `<span><strong>${teamName}</strong>'s Todo List</span>`;
};
