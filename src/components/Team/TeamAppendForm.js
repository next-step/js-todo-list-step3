import {Component} from "../../core/Component.js";
import {SET_OPENED_APPEND_FORM, teamStore} from "../../store/teamStore.js";
import {addEventBubblingListener} from "../../utils/index.js";

export const TeamAppendForm = class extends Component {

  render () {
    const { openedAppendForm } = teamStore.$state;
    return openedAppendForm ? `
      <div class="modal">
        <div class="modal-box">
          <button type="button" class="modal-close-button">×</button>
          test
        </div>     
      </div>
    ` : '';
  }

  componentDidUpdate ($target) {
    $target.querySelector('.modal-box')?.addEventListener('click', event => event.stopPropagation());
  }

  setEvent ($target) {
    $target.addEventListener('click', () => this.#close());
    addEventBubblingListener($target, '.modal-close-button', 'click', () => this.#close());
  }

  #close () {
    teamStore.commit(SET_OPENED_APPEND_FORM, false);
  }

}