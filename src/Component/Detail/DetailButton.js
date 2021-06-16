import Component from '../../core/Component.js';
import { delegate } from '../../util/helpers.js';

export default class DetailButton extends Component {
  constructor($element, props) {
    super($element, props);
    this.addTeamMember = this.props.addTeamMember;
    this.render();
  }

  handleClick() {
    const name = prompt('새로운 팀원 이름을 입력해주세요.');
    if (name === null || name.length <= 0) return;
    this.addTeamMember(name);
  }
  setEvent() {
    delegate(this.$element, 'click', '#add-user-button', () =>
      this.handleClick()
    );
    delegate(this.$element, 'click', '.material-icons', () =>
      this.handleClick()
    );
  }

  template() {
    return `
    <li class="add-user-button-container">
        <button id="add-user-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
    </li>`;
  }
  render() {
    this.$element.innerHTML += this.template();
  }
}
