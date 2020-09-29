import Component from '../../core/Component.js';

export default class AddMemberButton extends Component {
  render() {
    this.$target.innerHTML = `
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
  }
}
