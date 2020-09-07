import {Component} from "../../core/Component.js";
import {SET_OPENED_APPEND_FORM, teamStore} from "../../store/teamStore.js";
import {todoRouter} from "../../router/todoRouter.js";

export const TeamList = class extends Component {

  render () {
    const { teams } = teamStore.$state;

    return `
      ${teams.map(({ _id, name }) => `
        <div class="team-card-container" data-id="${_id}">
          <a href="#!" class="card" data-ref="view">
            <div class="card-title">
              ${name}
            </div>
          </a>
        </div>
      `).join('')}
      
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple" data-ref="add">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  }

  setEvent () {
    this.addEvent('view', 'click', event => {
      event.preventDefault();
      const { target } = event;
      const id = target.closest('[data-id]').dataset.id;
      todoRouter.push(`./kanban.html?id=${id}`);
    })
    this.addEvent( 'add', 'click', () => {
      teamStore.commit(SET_OPENED_APPEND_FORM, true);
    });
  }

}