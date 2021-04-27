import { $ } from "../../utils/dom.js";
import { SELECTORS } from "../../utils/constant.js";

class TodoInput {
  constructor() {
    this.$target = $(SELECTORS.INPUT);
    this.bindEvent();
  }

  bindEvent() {
    if (this.$target) {
      this.$target.addEventListener("keydown", (e) => {
        console.log("아하하");
      });
    }
  }
}

export default TodoInput;
