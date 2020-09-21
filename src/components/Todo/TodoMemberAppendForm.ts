import {Component} from "@/core";
import {ADD_TEAM_MEMBER, todoOfTeamStore, SET_OPENED_MEMBER_APPEND_FORM, teamStore} from "@/store";
import {selectElement} from "@/utils";
import {KeyEvent} from "@/domains";

export const TodoMemberAppendForm = class extends Component {

  private close () {
    todoOfTeamStore.commit(SET_OPENED_MEMBER_APPEND_FORM, false);
  }

  private async appendTeam (name: string) {
    try {
      await todoOfTeamStore.dispatch(ADD_TEAM_MEMBER, name);
      this.close();
    } catch (e) {
      console.error(e);
    }
  }

  protected template () {
    const { openedAppendForm } = todoOfTeamStore.$state;
    return openedAppendForm ? `
      <div class="modal" data-ref="close">
        <div class="modal-box">
          <button type="button" class="modal-close-button" data-ref="close">×</button>
          <h3 class="modal-title">멤버 추가하기</h3>
          <div class="appendForm">
            <input type="text" data-ref="team-name" />
            <button type="button">추가하기</button>
          </div>
        </div>     
      </div>
    ` : '';
  }

  protected componentDidMount () {
    if (!todoOfTeamStore.$state.openedAppendForm) return;
    const { $target } = this;
    selectElement('.modal-box', $target).addEventListener('click', event => event.stopPropagation());
    selectElement('input', $target).focus();
  }

  protected setEvent () {
    this.addEvent('close', 'click', () => this.close());
    this.addEvent<KeyEvent>('team-name', 'keyup', ({ key, target }) => {
      if (key === 'Escape') this.close();
      if (key === 'Enter') this.appendTeam(target.value);
    })
  }

}
