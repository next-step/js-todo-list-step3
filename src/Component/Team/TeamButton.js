import Component from '../../core/Component.js';
import { on, qs } from '../../util/helpers.js';

export default class TeamButton extends Component {
  constructor($element, props) {
    super($element, props);
    this.addTeam = this.props.addTeam;
    this.render();
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
    this.mounted();
  }
  mounted() {
    on(qs('.add-team-button-container'), 'click', () => this.addTeam());
  }
}
