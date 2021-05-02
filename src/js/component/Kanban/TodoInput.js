import { SELECTORS, KEY_NAMES } from "../../utils/constant.js";
import { $ } from "../../utils/dom.js";
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
    const todoListContainer = target.closest(SELECTORS.TODO);
    const teamId = this.container.dataset.teamId;
    const memberId = todoListContainer.dataset.member;
    const contents = target.value;
    dispatch(ACTIONS.AddNewTodoReqAction({ teamId, memberId, contents }));
    target.value = "";
    const itemsContainer = $(SELECTORS.TODO_ITEMS_CONTAINER, todoListContainer);
  }
}

export default TodoInput;
