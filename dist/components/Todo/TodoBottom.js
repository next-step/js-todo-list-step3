import { COUNT_CONTAINER, DELETE_ALL } from "../../utils/data.js";
import { todoBottomTemplate, errorCallTemplate } from "../../utils/template.js";

export default function TodoBottom({
  $target,
  todoCount,
  filterTodo,
  deleteAllTodos
}) {
  this.init = () => {
    if (!(this instanceof TodoBottom)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      todoCount,
      type: location.hash.split("#")[1]
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
    this.$todoBottom.innerHTML = todoBottomTemplate(this.state.todoCount, this.state.type);
  };

  this.bindEventListener = () => {
    this.$todoBottom.addEventListener("click", this.clickHandler);
  };

  this.clickHandler = ({ target }) => {
    if (target.tagName === "BUTTON" && target.className === DELETE_ALL) {
      this.deleteAllTodos();
    } else if (target.tagName === "A") {
      this.state.type = target.hash.split("#")[1];
      this.filterTodo(this.state.type);
    }
  };

  this.setState = todoCount => {
    this.state.todoCount = todoCount;
    this.render();
  };

  this.init();
}