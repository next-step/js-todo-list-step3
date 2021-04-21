import { getEl } from "@js/util";
import { addTodoItem } from "@lib/api";
import { KEY, VALIDATION, MESSAGES } from "@constants/constant";

class TodoInput {
  constructor({ todoId, teamId, store }) {
    this.store = store;
    this.todoId = todoId;
    this.teamId = teamId;
    this.inputEl = getEl(`li[data-_id="${todoId}"] input.new-todo`);
    this.init();
  }

  init() {
    this.inputEl.addEventListener("keyup", this.addTodoHandler.bind(this));
  }

  async addTodoHandler({ key, target }) {
    if (key !== KEY.ENTER || !target.value) return;
    if (target.value.length < VALIDATION.MIN_TODO_CONTENTS_LENGTH) return alert(MESSAGES.INVALID_ADD_TODO);

    const { todoList } = this.store.get();
    const { data } = await addTodoItem({ teamId: this.teamId, todoId: this.todoId, contents: target.value });
    const _todoList = [...todoList, data];
    target.value = "";

    this.store.set({
      todoList: [..._todoList],
    });
  }
}

export default TodoInput;
