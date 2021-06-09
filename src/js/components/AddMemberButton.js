import { $ } from "../lib/util.js";
import { TEMPLATE } from "../constants/template.js";

class AddMemberButton {
  constructor({ onAddMember }) {
    this.onAddMember = onAddMember;
    this.init();
  }

  init() {
    this.render();
    this.registerEventListener();
  }

  render() {
    $(".todoapp-list-container").innerHTML += TEMPLATE.ADD_MEMBER_BUTTON;
  }

  registerEventListener() {
    $("#add-user-button").addEventListener("click", this.onAddMember);
  }
}

export default AddMemberButton;
