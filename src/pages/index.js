// const $addTeamButton = document.querySelector('#add-team-button')
// $addTeamButton.addEventListener('click', () => {
//   const result = prompt('팀 이름을 입력해주세요')
// })

import { $ } from "../utils/selectors.js";
import { getTeamsAPI } from "../api/requests.js";

export default class App {
  constructor() {
    this.state = {
      teams: [],
    };
    this.init();
    this.render();
  }
  init = async () => {
    const teams = await getTeamsAPI();
    this.state = {
      teams,
    };
    this.render();
  };

  render = () => {
    $("#app").innerHTML = `<h1 id="user-title">
          <span><strong>Team</strong>'s Todo Lists</span>
        </h1>
        <div class="team-list-container">
          ${this.state.teams
            .map(({ _id, name }) => {
              return `
                <div class="team-card-container">
                <a href="/kanban.html?id=${_id}" class="card">
                  <div class="card-title">${name}</div>
                </a>
              </div>`;
            })
            .join("")}
          <div class="add-team-button-container">
            <button id="add-team-button" class="ripple">
              <span class="material-icons">add</span>
            </button>
          </div>
          `;
  };
}
