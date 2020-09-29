import Component from '../../core/Component.js';

export default class AddMemberButton extends Component {
  initEventListener() {
    this.$target.addEventListener('click', () => {
      const result = prompt('이름을 입력해주세요');
      if (!!result) this.props.addTeamMember(result);
    });
  }

  render() {
    this.$target.innerHTML = `
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
  }
}
