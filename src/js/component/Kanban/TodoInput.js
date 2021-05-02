import { SELECTORS, KEY_NAMES } from "../../utils/constant.js";
import { dispatch } from "../../redux/functions.js";
import { ACTIONS } from "../../actions/todo.js";

class TodoInput {
  constructor(container) {
    this.container = container;
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener("keydown", (e) => this.onSubmit(e));
  }

  async onSubmit({ key, target }) {
    if (key !== KEY_NAMES.ENTER) return;
    const teamId = this.container.dataset.teamId;
    const memberId = target.closest(SELECTORS.TODO).dataset.member;
    const contents = target.value;
    dispatch(ACTIONS.AddNewTodoReqAction({ teamId, memberId, contents }));
    target.value = "";
  }
}

export default TodoInput;
