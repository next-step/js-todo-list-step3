import { $$ } from "../lib/util.js";

class TodoFilter {
  constructor({ filtering }) {
    this.filtering = filtering;
    this.init();
  }

  init() {
    this.registerEventListener();
  }

  registerEventListener() {
    $$(".filters").forEach((element) => {
      element.addEventListener("click", (event) => {
        this.filtering(event);
      });
    });
  }
}
export default TodoFilter;
