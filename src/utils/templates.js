import { CLASS_SELECTOR } from "./constants.js";

export const teamCardContainer = (team) => `
<div class="${CLASS_SELECTOR.TEAM_CARD_CONTAINER}" data-team-id="${team._id}">
    <a href="/kanban.html?id=${team._id}" class="card">
        <span class="${CLASS_SELECTOR.DELETE_TEAM}">❌</span>
        <div class="card-title">${team.name}</div>
    </a>
</div>
`;

export const loadingCircle = () =>
  `<div class="loading-container"><div class="loading-circle"></div></div>`;

export const title = () =>
  `<h1><span><strong>Team</strong>'s Todo Lists</span></h1>`;
