import Component from '../../core/Component.js';

export default class AddButton extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.render();
  }

  initEventListener() {
    this.$target.addEventListener('click', () => {
      const result = prompt('팀 이름을 입력해주세요');
      this.props.addTeam(result);
    });
  }

  render = () => {
    this.$target.innerHTML = `
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
  };
}
