import {Component} from "@/_core";
import {ADD_TEAM, SET_OPENED_TEAM_APPEND_FORM, teamStore} from "@/store";
import {selectElement} from "@/utils";
import {KeyEvent} from "@/domains";

export const TeamAppendForm = class extends Component {

  private close () {
    teamStore.commit(SET_OPENED_TEAM_APPEND_FORM, false);
  }

  private async appendTeam (name: string) {
    try {
      await teamStore.dispatch(ADD_TEAM, name);
      this.close();
    } catch (e) {
      console.error(e);
    }
  }

  protected template () {
    const { openedAppendForm } = teamStore.$state;
    return openedAppendForm ? `
      <div class="modal" data-ref="close">
        <div class="modal-box">
          <button type="button" class="modal-close-button" data-ref="close">×</button>
          <h3 class="modal-title">팀 추가하기</h3>
          <form action="" data-ref="append">
            <div class="appendForm">
              <input type="text" data-ref="team-name" />
              <button type="submit">추가하기</button>
            </div>
          </form>
        </div>     
      </div>
    ` : '';
  }

  protected componentDidMount () {
    if (!teamStore.$state.openedAppendForm) return;
    const { $target } = this;
    selectElement('.modal-box', $target).addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.closest('.modal-box')) {
        event.stopPropagation();
      }
    });
    selectElement('input', $target).focus();
  }

  protected setEvent () {
    this.addEvent('close', 'click', () => this.close());
    this.addEvent('append', 'submit', e => {
      e.preventDefault();
      const teamName = (selectElement('input', e.target) as HTMLInputElement).value;
      this.appendTeam(teamName);
    });
    this.addEvent<KeyEvent>('team-name', 'keyup', ({ key, target }) => {
      if (key === 'Escape') this.close();
    })
  }
}
