import {Component} from "@/core";
import {ADD_TEAM, SET_OPENED_APPEND_FORM, teamStore} from "@/store";
import {Events} from "@/domains";

export const TeamAppendForm = class extends Component<{}> {

  template () {
    const { openedAppendForm } = teamStore.$state;
    return openedAppendForm ? `
      <div class="modal" data-ref="close">
        <div class="modal-box">
          <button type="button" class="modal-close-button" data-ref="close">×</button>
          <h3 class="modal-title">팀 추가하기</h3>
          <div class="appendForm">
            <input type="text" data-ref="team-name" />
            <button type="button">추가하기</button>
          </div>
        </div>     
      </div>
    ` : '';
  }

  componentDidUpdate () {
    const { $target } = this;
    $target.querySelector('.modal-box')?.addEventListener('click', event => {
      if ($target === event.currentTarget) event.stopPropagation();
    });
    $target.querySelector('input')?.focus();
  }

  setEvent () {
    this.addEvent('close', 'click', () => this.close());
    this.addEvent('team-name', 'keyup', (event: Events) => {
      const { key, target } = event as KeyboardEvent;
      if (key === 'Escape') this.close();
      if (key === 'Enter') this.appendTeam((target as HTMLInputElement).value);
    })
  }

  private close () {
    teamStore.commit(SET_OPENED_APPEND_FORM, false);
  }

  private async appendTeam (name: string) {
    try {
      await teamStore.dispatch(ADD_TEAM, name);
      this.close();
    } catch (e) {
      console.error(e);
    }
  }
}