import { COUNT_CONTAINER, DELETE_ALL } from "../../utils/data.js";
import { todoBottomTemplate } from "../../utils/template.js";

export default function TodoBottom({
  $target,
  todoCount,
  filterTodo,
  deleteAllTodos,
}) {
  this.init = () => {
    this.state = {
      todoCount,
      type: location.hash.split("#")[1],
    };
    this.filterTodo = filterTodo;
    this.deleteAllTodos = deleteAllTodos;
    this.$todoBottom = document.createElement("div");
    this.$todoBottom.classList.add(COUNT_CONTAINER);
    this.render();
    this.bindEventListener();

    $target.appendChild(this.$todoBottom);
  };

  this.render = () => {
    this.$todoBottom.innerHTML = todoBottomTemplate(
      this.state.todoCount,
      this.state.type
    );
  };

  this.bindEventListener = () => {
    this.$todoBottom.addEventListener("click", this.clickHandler);
  };

  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "BUTTON" &&
      evt.target.className === DELETE_ALL
    ) {
      this.deleteAllTodos();
    } else if (evt.target.tagName === "A") {
      this.state.type = evt.target.hash.split("#")[1];
      this.filterTodo(this.state.type);
    }
  };

  this.setState = (todoCount) => {
    this.state.todoCount = todoCount;
    this.render();
  };

  this.init();
}
