import {Component} from "../../core/Component.js";

export const TeamList = class extends Component {

  render () {
    return `
        <div class="team-card-container">
          <a href="/kanban.html" class="card">
            <div class="card-title">
              Black Coffee team
            </div>
          </a>
        </div>
        <div class="team-card-container">
          <a href="/kanban.html" class="card">
            <div class="card-title">
              Black Coffee team
            </div>
          </a>
        </div>
        <div class="team-card-container">
          <a href="/kanban.html" class="card">
            <div class="card-title">
              Black Coffee team
            </div>
          </a>
        </div>
        <div class="team-card-container">
          <a href="/kanban.html" class="card">
            <div class="card-title">
              Black Coffee team
            </div>
          </a>
        </div>
        <div class="add-team-button-container">
          <button id="add-team-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>
    `;
  }

}