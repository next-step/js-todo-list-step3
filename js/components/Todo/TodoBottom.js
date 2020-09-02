import { COUNT_CONTAINER, DELETE_ALL } from "../../utils/data.js";
import TodoFilter from "./TodoFilter.js";

export default function TodoBottom({ $target, todoCount }) {
  this.init = () => {
    this.state = {
      todoCount,
    };
    this.$todoBottom = document.createElement("div");
    this.$todoBottom.classList.add(COUNT_CONTAINER);
    this.$todoBottom.innerHTML = `
      <span class="todo-count">총 <strong>${this.state.todoCount}</strong> 개</span>
    `;

    this.todoFilter = new TodoFilter({
      $target: this.$todoBottom,
    });

    this.renderDelBtn();
    $target.appendChild(this.$todoBottom);
  };

  this.renderDelBtn = () => {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add(DELETE_ALL);
    deleteBtn.addEventListener("click", () => {});
    this.$todoBottom.appendChild(deleteBtn);
  };

  this.init();
}
