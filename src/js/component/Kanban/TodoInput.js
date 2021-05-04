import { KEY_NAMES } from "../../utils/constant.js";
import { getMemberId } from "../../utils/dom.js";
import { dispatch } from "../../redux/functions.js";
import { ACTIONS } from "../../actions/todo.js";

class TodoInput {
  constructor(container) {
    this.container = container;
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener("keyup", (e) => this.onSubmit(e));
  }

  onSubmit({ key, target }) {
    if (key !== KEY_NAMES.ENTER) return;
    const teamId = this.container.dataset.teamId;
    const memberId = getMemberId(target);
    const contents = target.value;
    dispatch(ACTIONS.AddNewTodoReqAction({ teamId, memberId, contents }));
    target.value = "";
  }
}

export default TodoInput;
