import Component from '../../core/Component.js';
import { delegate } from '../../util/helpers.js';

export default class TeamButton extends Component {
  constructor($element, props) {
    super($element, props);
    this.addTeam = this.props.addTeam;
    this.render();
  }
  handleClick() {
    const name = prompt('팀 이름을 입력해주세요');
    if (name === null || name.length <= 0) return;

    this.addTeam(name);
  }
  setEvent() {
    delegate(this.$element, 'click', '#add-team-button', () =>
      this.handleClick()
    );
    delegate(this.$element, 'click', '.material-icons', () =>
      this.handleClick()
    );
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
