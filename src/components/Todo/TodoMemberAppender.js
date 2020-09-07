import {Component} from "../../core/Component.js";
import {SET_OPENED_APPEND_FORM, todoOfTeamStore} from "../../store/todoOfTeamStore.js";

export const TodoMemberAppender = class extends Component {
  render () {
    return `
      <button id="add-user-button" class="ripple" data-ref="append">
        <span class="material-icons">add</span>
      </button>
    `;
  }

  setEvent () {
    this.addEvent('append', 'click', () => todoOfTeamStore.commit(SET_OPENED_APPEND_FORM, true));
  }
}