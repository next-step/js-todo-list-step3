import { $ } from "../../utils/dom.js";
import { SELECTORS } from "../../utils/constant.js";

class TodoInput {
  constructor() {
    this.$target = $(SELECTORS.input);
    this.bindEvent();
  }

  bindEvent() {}
}

export default TodoInput;
