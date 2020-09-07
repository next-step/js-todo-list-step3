import {Component} from "../../core/Component.js";
import {SET_OPENED_APPEND_FORM, teamStore} from "../../store/teamStore.js";
import {addEventBubblingListener} from "../../utils/index.js";

export const TeamList = class extends Component {

  render () {
    const { teams } = teamStore.$state;

    return `
      ${teams.map(({ _id, name }) => `
        <div class="team-card-container">
          <a href="#!" class="card" data-id="${_id}" data-ref="view">
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
    })
    this.addEvent( 'add', 'click', () => {
      teamStore.commit(SET_OPENED_APPEND_FORM, true);
    });
  }

}