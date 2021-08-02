import { $$ } from "../lib/util.js";

class TodoDeleteAll {
  constructor({ onDeleteAll }) {
    this.onDeleteAll = onDeleteAll;
    this.init();
  }

  init() {
    this.registerEventListener();
  }

  registerEventListener() {
    $$(".clear-completed").forEach((element) => {
      element.addEventListener("click", (event) => this.onDeleteAll(event));
    });
  }
}

export default TodoDeleteAll;
