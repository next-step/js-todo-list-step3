import { CLASS_NAMES } from "../../utils/constant.js";
import { getMemberId } from "../../utils/dom.js";
class TodoFilter {
  constructor(container) {
    this.container = container;
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener("click", (e) => this.onClick(e));
  }

  onClick({ target }) {
    const className = target.className;
    if (
      className === CLASS_NAMES.SORT ||
      className === CLASS_NAMES.ACTIVE ||
      className === CLASS_NAMES.ALL ||
      className === CLASS_NAMES.COMPLETED
    )
      return this.filterTodos(target, className);
  }

  filterTodos(target, state) {
    const memberId = getMemberId(target);
  }
}

export default TodoFilter;
