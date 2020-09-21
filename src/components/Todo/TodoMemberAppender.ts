import {Component} from "@/_core";
import {SET_OPENED_MEMBER_APPEND_FORM, todoOfTeamStore} from "@/store";

export const TodoMemberAppender = class extends Component {

  protected template () {
    return `
      <button id="add-user-button" class="ripple" data-ref="append">
        <span class="material-icons">add</span>
      </button>
    `;
  }

  protected setEvent () {
    this.addEvent('append', 'click', () =>
      todoOfTeamStore.commit(SET_OPENED_MEMBER_APPEND_FORM, true));
  }

}
