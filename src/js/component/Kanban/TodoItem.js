import {
  SELECTORS,
  KEY_NAMES,
  CLASS_NAMES,
  POPUP_MESSAGES,
} from "../../utils/constant.js";
import { getMemberId, getTodoItemId } from "../../utils/dom.js";
import { dispatch } from "../../redux/functions.js";
import { ACTIONS } from "../../actions/todo.js";

class TodoItem {
  constructor(container) {
    this.container = container;
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener("click", (e) => this.onClick(e));
  }

  onClick({ target }) {
    const teamId = this.container.dataset.teamId;
    const assignAction = {
      [CLASS_NAMES.TOGGLE]: () => this.toggleComplete(target),
      [CLASS_NAMES.DESTROY]: () =>
        confirm(POPUP_MESSAGES.REMOVE_TODO) && this.removeTodo(target, teamId),
      [CLASS_NAMES.PRIORITY_SELECT]: () => {
        const priority = target.value;
        // return priority !== PRIORITY.NONE && this.changePriority();
      },
    };

    const className = target.className;
    return assignAction[className] && assignAction[className]();
  }

  toggleComplete() {}

  removeTodo(target, teamId) {
    const memberId = getMemberId(target);
    const itemId = getTodoItemId(target);
    dispatch(ACTIONS.RemoveTodoReqAction({ teamId, memberId, itemId }));
  }

  changePriority() {}
}

export default TodoItem;
