import {Component} from "../../core/Component.js";
import {SET_OPENED_APPEND_FORM, teamStore} from "../../store/teamStore.js";
import {addEventBubblingListener} from "../../utils/index.js";

export const TeamAppendForm = class extends Component {

  render () {
    const { openedAppendForm } = teamStore.$state;
    return openedAppendForm ? `
      <div class="modal" data-ref="close">
        <div class="modal-box">
          <button type="button" class="modal-close-button" data-ref="close">×</button>
          <div class="appendForm">
            <input type="text" data-ref="" />
            <button type="button">추가하기</button>
          </div>
        </div>     
      </div>
    ` : '';
  }

  componentDidUpdate ($target) {
    $target.querySelector('.modal-box')?.addEventListener('click', event => {
      if ($target === event.currentTarget) event.stopPropagation();
    });
    $target.querySelector('input')?.focus();
  }

  setEvent ($target) {
    addEventBubblingListener($target, 'close', 'click', () => this.#close());
  }

  #close () {
    teamStore.commit(SET_OPENED_APPEND_FORM, false);
  }

}