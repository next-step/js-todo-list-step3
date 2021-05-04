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
    this.container.addEventListener("dblclick", (e) => this.onDoubleClick(e));
    this.container.addEventListener("keydown", (e) => this.onKeyDown(e));
  }

  onClick({ target }) {
    const teamId = this.container.dataset.teamId;
    const assignAction = {
      [CLASS_NAMES.TOGGLE]: () => this.toggleComplete(target, teamId),
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

  onDoubleClick({ target }) {
    if (target.classList.contains(CLASS_NAMES.LABEL)) {
      return this.changeToEditMode(target);
    }
  }

  onKeyDown({ target, key }) {
    if (key === KEY_NAMES.ENTER || key === KEY_NAMES.ESC) {
      return target && this.closeEditMode(target, key);
    }
  }

  toggleComplete(target, teamId) {
    const memberId = getMemberId(target);
    const itemId = getTodoItemId(target);
    dispatch(ACTIONS.ToggleTodoReqAction({ teamId, memberId, itemId }));
  }

  removeTodo(target, teamId) {
    const memberId = getMemberId(target);
    const itemId = getTodoItemId(target);
    dispatch(ACTIONS.RemoveTodoReqAction({ teamId, memberId, itemId }));
  }

  changeToEditMode(target) {
    const $li = target.closest(SELECTORS.TODO_ITEM);
    if ($li.classList.contains(CLASS_NAMES.COMPLETED)) return;
    $li.classList.add(CLASS_NAMES.EDITING);
  }

  closeEditMode(target, key) {
    const $li = target.closest(SELECTORS.TODO_ITEM);
    const value = target.value;
    const { contents, item: itemId } = $li.dataset;
    if (key === KEY_NAMES.ENTER && value !== contents) {
      const memberId = getMemberId(target);
      dispatch(
        ACTIONS.UpdateTodoReqAction({
          teamId: this.container.dataset.teamId,
          memberId,
          itemId,
          contents: value,
        })
      );
    }
    $li.classList.remove(CLASS_NAMES.EDITING);
  }

  changePriority() {}
}

export default TodoItem;
