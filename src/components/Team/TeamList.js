import {Component} from "../../core/Component.js";
import {teamStore} from "../../store/teamStore.js";

export const TeamList = class extends Component {

  render () {
    const { teams } = teamStore.$state;

    return `
      ${teams.map(({ _id, name }) => `
        <div class="team-card-container">
          <a href="/kanban.html" class="card" data-id="${_id}">
            <div class="card-title">
              ${name}
            </div>
          </a>
        </div>
      `).join('')}
      
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  }

}