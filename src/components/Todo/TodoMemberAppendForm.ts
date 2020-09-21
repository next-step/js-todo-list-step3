import {Component} from "@/_core";
import {ADD_TEAM_MEMBER, todoOfTeamStore, SET_OPENED_MEMBER_APPEND_FORM, teamStore} from "@/store";
import {selectElement} from "@/utils";
import {KeyEvent} from "@/domains";

export const TodoMemberAppendForm = class extends Component {

  private close () {
    todoOfTeamStore.commit(SET_OPENED_MEMBER_APPEND_FORM, false);
  }

  private async appendMember (name: string) {
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
          <form action="" data-ref="append">
            <div class="appendForm">
              <input type="text" data-ref="member-name" />
              <button type="submit">추가하기</button>
            </div>
          </form>
        </div>
      </div>
    ` : '';
  }

  protected componentDidMount () {
    if (!todoOfTeamStore.$state.openedAppendForm) return;
    const { $target } = this;
    selectElement('.modal-box', $target).addEventListener('click', e => e.stopPropagation());
    selectElement('input', $target).focus();
  }

  protected setEvent () {
    this.addEvent('close', 'click', () => this.close());
    this.addEvent('append', 'submit', e => {
      e.preventDefault();
      const memberName = (selectElement('input', e.target) as HTMLInputElement).value;
      this.appendMember(memberName);
    });
    this.addEvent<KeyEvent>('member-name', 'keyup', ({ key, target }) => {
      if (key === 'Escape') this.close();
    })
  }

}
