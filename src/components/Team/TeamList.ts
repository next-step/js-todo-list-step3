import {Component} from "@/core";
import {SET_OPENED_TEAM_APPEND_FORM, teamStore} from "@/store";
import {todoRouter} from "@/router";
import {selectElement, selectParent} from "@/utils";

export const TeamList = class extends Component {

  protected template () {
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

  protected setEvent () {

    this.addEvent('view', 'click', event => {
      event.preventDefault();
      const id = selectParent('[data-id]', event.target).dataset.id as string;
      todoRouter.push(`./kanban.html?id=${id}`);
    })

    this.addEvent( 'add', 'click', () => {
      teamStore.commit(SET_OPENED_TEAM_APPEND_FORM, true);
    });

  }

}
