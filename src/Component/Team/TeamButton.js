import Component from '../../core/Component.js';
import { delegate } from '../../util/helpers.js';

export default class TeamButton extends Component {
  constructor($element, props) {
    super($element, props);
    this.addTeam = this.props.addTeam;
    this.render();
  }
  setEvent() {
    delegate(this.$element, 'click', '#add-team-button', () => this.addTeam());
    delegate(this.$element, 'click', '.material-icons', () => this.addTeam());
  }

  template() {
    return `
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </div>`;
  }
  render() {
    this.$element.innerHTML += this.template();
  }
}
