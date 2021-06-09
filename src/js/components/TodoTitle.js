import { $ } from "../lib/util.js";

class TodoTitle {
  constructor({ titleName }) {
    this.target = $("#user-title strong");
    this.titleName = titleName;
    this.init();
  }

  init() {
    this.target.innerHTML = this.titleName;
  }
}

export default TodoTitle;
