import { $$ } from "../lib/util.js";

class TodoInput {
  constructor({ onAddItem }) {
    this.onAddItem = onAddItem;
    this.init();
  }

  init() {
    this.registerEventListener();
  }

  registerEventListener() {
    $$(".new-todo").forEach((element) => {
      element.addEventListener("keydown", (event) => this.onAddItem(event));
    });
  }
}

export default TodoInput;
