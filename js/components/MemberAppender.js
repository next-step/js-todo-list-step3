import Component from "../core/Component.js";

export default class TodoAppender extends Component {
  template() {
    return `<button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>`;
  }
  setEvent() {
    const { addMember } = this.props;
    const $addUserBtn = document.getElementById("add-user-button");
    $addUserBtn.addEventListener("click", addMember);
  }
}
